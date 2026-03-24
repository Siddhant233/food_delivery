package com.fooddeliveryapp.service;

import com.fooddeliveryapp.dto.DailyCalorieTrackerDTO;
import com.fooddeliveryapp.dto.FoodRecommendationResponseDTO;
import com.fooddeliveryapp.dto.HealthProfileRequestDTO;
import com.fooddeliveryapp.dto.MealCaloriesDTO;
import com.fooddeliveryapp.dto.RecommendedMenuItemDTO;
import com.fooddeliveryapp.entity.MenuItem;
import com.fooddeliveryapp.entity.OrderItem;
import com.fooddeliveryapp.entity.User;
import com.fooddeliveryapp.repository.MenuItemRepository;
import com.fooddeliveryapp.repository.OrderItemRepository;
import com.fooddeliveryapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class NutritionService {

    private final MenuItemRepository menuItemRepository;
    private final OrderItemRepository orderItemRepository;
    private final UserRepository userRepository;

    public FoodRecommendationResponseDTO getRecommendations(HealthProfileRequestDTO profile) {
        int targetCalories = resolveTargetCalories(profile);
        String goal = normalize(profile.getGoal());
        String diet = normalize(profile.getDiet());

        List<RecommendedMenuItemDTO> recommendations = menuItemRepository.findByAvailableTrue().stream()
                .filter(item -> item.getCalories() != null)
                .sorted(Comparator.comparingInt(item -> scoreItem(item, goal, diet, targetCalories)))
                .limit(3)
                .map(item -> new RecommendedMenuItemDTO(
                        item.getMenuItemId(),
                        item.getName(),
                        item.getDescription(),
                        item.getPrice(),
                        item.getCalories(),
                        safeDouble(item.getProteinGrams()),
                        safeDouble(item.getCarbsGrams()),
                        safeDouble(item.getFatGrams()),
                        item.getRestaurant() != null ? item.getRestaurant().getName() : null,
                        buildReason(item, goal, diet, targetCalories)
                ))
                .toList();

        return new FoodRecommendationResponseDTO(targetCalories, goal, diet, recommendations);
    }

    public DailyCalorieTrackerDTO getDailyTracker(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        LocalDate today = LocalDate.now();
        LocalDateTime start = today.atStartOfDay();
        LocalDateTime end = today.plusDays(1).atStartOfDay();

        Map<String, Integer> mealCalories = new LinkedHashMap<>();
        mealCalories.put("Breakfast", 0);
        mealCalories.put("Lunch", 0);
        mealCalories.put("Dinner", 0);
        mealCalories.put("Snacks", 0);

        int consumedCalories = 0;
        for (OrderItem orderItem : orderItemRepository.findByOrderUserUserIdAndOrderOrderTimeBetween(userId, start, end)) {
            if (orderItem.getMenuItem() == null || orderItem.getMenuItem().getCalories() == null) {
                continue;
            }

            int itemCalories = orderItem.getMenuItem().getCalories() * safeQuantity(orderItem.getQuantity());
            consumedCalories += itemCalories;

            String mealSlot = resolveMealSlot(orderItem.getOrder().getOrderTime());
            mealCalories.put(mealSlot, mealCalories.get(mealSlot) + itemCalories);
        }

        int targetCalories = user.getDailyCalorieTarget() != null ? user.getDailyCalorieTarget() : 2000;
        List<MealCaloriesDTO> mealBreakdown = new ArrayList<>();
        for (Map.Entry<String, Integer> entry : mealCalories.entrySet()) {
            mealBreakdown.add(new MealCaloriesDTO(entry.getKey(), entry.getValue()));
        }

        return new DailyCalorieTrackerDTO(
                userId,
                today.toString(),
                targetCalories,
                consumedCalories,
                Math.max(targetCalories - consumedCalories, 0),
                mealBreakdown
        );
    }

    private int scoreItem(MenuItem item, String goal, String diet, int targetCalories) {
        int score = Math.abs(item.getCalories() - perMealTarget(targetCalories));

        double protein = safeDouble(item.getProteinGrams());
        double carbs = safeDouble(item.getCarbsGrams());
        double fat = safeDouble(item.getFatGrams());
        String itemText = (safeString(item.getName()) + " " + safeString(item.getDescription())).toLowerCase(Locale.ROOT);

        if (goal.contains("weight loss")) {
            score += item.getCalories();
            score -= (int) (protein * 8);
            score += (int) (fat * 2);
        } else if (goal.contains("muscle gain")) {
            score -= (int) (protein * 10);
            score += Math.abs(item.getCalories() - 650);
        } else if (goal.contains("maintenance")) {
            score += Math.abs(item.getCalories() - 550);
            score -= (int) (protein * 4);
        }

        if (diet.contains("high protein")) {
            score -= (int) (protein * 12);
        }
        if (diet.contains("low carb")) {
            score += (int) (carbs * 6);
        }
        if (diet.contains("low fat")) {
            score += (int) (fat * 8);
        }
        if (diet.contains("vegetarian") && !(itemText.contains("paneer") || itemText.contains("veg") || itemText.contains("vegetable") || itemText.contains("salad"))) {
            score += 300;
        }

        return score;
    }

    private String buildReason(MenuItem item, String goal, String diet, int targetCalories) {
        List<String> reasons = new ArrayList<>();
        if (goal.contains("weight loss") && item.getCalories() != null && item.getCalories() <= perMealTarget(targetCalories)) {
            reasons.add("fits a lower-calorie meal target");
        }
        if (diet.contains("high protein") && safeDouble(item.getProteinGrams()) >= 20) {
            reasons.add("provides strong protein per serving");
        }
        if (diet.contains("low carb") && safeDouble(item.getCarbsGrams()) <= 25) {
            reasons.add("keeps carbohydrates controlled");
        }
        if (reasons.isEmpty()) {
            reasons.add("matches the selected nutrition profile");
        }
        return String.join(", ", reasons);
    }

    private int resolveTargetCalories(HealthProfileRequestDTO profile) {
        if (profile.getDailyCalorieTarget() != null && profile.getDailyCalorieTarget() > 0) {
            return profile.getDailyCalorieTarget();
        }

        String goal = normalize(profile.getGoal());
        double weight = profile.getWeightKg() != null ? profile.getWeightKg() : 70.0;
        int baseline = (int) Math.round(weight * 30);

        if (goal.contains("weight loss")) {
            return Math.max(1200, baseline - 400);
        }
        if (goal.contains("muscle gain")) {
            return baseline + 300;
        }
        return baseline;
    }

    private int perMealTarget(int targetCalories) {
        return Math.max(targetCalories / 3, 350);
    }

    private String resolveMealSlot(LocalDateTime orderTime) {
        int hour = orderTime.getHour();
        if (hour >= 5 && hour < 11) {
            return "Breakfast";
        }
        if (hour >= 11 && hour < 16) {
            return "Lunch";
        }
        if (hour >= 16 && hour < 23) {
            return "Dinner";
        }
        return "Snacks";
    }

    private String normalize(String value) {
        return safeString(value).trim().toLowerCase(Locale.ROOT);
    }

    private String safeString(String value) {
        return value == null ? "" : value;
    }

    private double safeDouble(Double value) {
        return value == null ? 0.0 : value;
    }

    private int safeQuantity(Integer quantity) {
        return quantity == null || quantity < 1 ? 1 : quantity;
    }
}
