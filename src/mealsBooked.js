const mealsList = document.getElementById('mealsList');

let meals =
[
];

let mealOrders = 
[
];

function filterMealOrders(meals, mealOrders) {
    let filteredMeals = [];

    mealOrders.forEach(order => {
        let meal = meals.find(item => item.meal_id === order.meal_id);
        if (meal) {
            filteredMeals.push({
                meal_name: meal.meal_name,
                username: order.username,
                order_date: order.order_date,
                meal_image_url: meal.meal_image_url
            });
        }
    });

    return filteredMeals;
}

// Function to fetch all meals from the database
async function getAllMeals() {
    try {
        const response = await fetch('/data-api/rest/Meal_menu');
        if (!response.ok) {
            throw new Error('Error fetching meals: ' + response.statusText);
        }
        const data = await response.json();
        if (!data.value || !Array.isArray(data.value)) {
            throw new Error('Meals data is not in the expected format.');
        }
        return data.value;
    } catch (error) {
        console.error('Error fetching meals:', error);
        throw new Error('An error occurred while fetching meals. Please try again later.');
    }
}

// Function to fetch all meals orders from the database
async function getAllMealOrders() {
    try {
        const response = await fetch('/data-api/rest/Meal_orders');
        if (!response.ok) {
            throw new Error('Error fetching meal orders: ' + response.statusText);
        }
        const data = await response.json();
        if (!data.value || !Array.isArray(data.value)) {
            throw new Error('Meal orders data is not in the expected format.');
        }
        return data.value;
    } catch (error) {
        console.error('Error fetching meal orders:', error);
        throw new Error('An error occurred while fetching meal orders. Please try again later.');
    }
}

function getMeals(mealData){
    mealData.forEach(meal => {
        meals.push({
            "meal_id": meal.meal_id,
            "meal_name": meal.meal_name,
            "description": meal.description,
            "created_by": meal.created_by,
            "meal_image_url": meal.meal_image_url
          })
    });
}

function getMealOrders(mealOrderData){
    mealOrderData.forEach(order => {
        mealOrders.push({
            "meal_id": order.meal_id,
            "meal_name": order.meal_name,
            "description": order.description,
            "created_by": order.created_by,
            "meal_image_url": order.meal_image_url
          })
    });
}

const mealData = getAllMeals();
const mealOrderData = getAllMealOrders();
meals = getMeals(mealData);
mealOrders = getMealOrders(mealOrderData);
let filteredResults = filterMealOrders(meals, mealOrders);
console.log(filteredResults);

function renderMealList(){
    filteredResults.forEach((meal, index) => {
        const mealBooking = document.createElement('block');
        mealBooking.classList.add('meal-card');
        mealBooking.innerHTML = `
            <h2>Meal: ${meal.meal_name}</h2>
            <p>Booked By: ${meal.username}</p>
            <p>Ordered ${meal.order_date}</p>
            <img src=${meal.meal_image_url}>
        `;
        mealsList.appendChild(mealBooking);
    });
};

renderMealList();