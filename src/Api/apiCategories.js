import http from './httpServices';

const urlCategories = "https://api.escuelajs.co";

export const apiGetCategories = async () => {
    try {
        const response = await http.get(`${urlCategories}/api/v1/categories`);
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
};

export const apiDeleteCategory = async (categoryID) => {
    try {
        const response = await http.delete(`${urlCategories}/api/v1/categories/${categoryID}`);
        console.log("Request URL:", `${urlCategories}/api/v1/categories/${categoryID}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting category:", error);
    }
};

export const apiEditCategory = async (categoryId, updatedData) => {
    try {
        const response = await http.put(`${urlCategories}/api/v1/categories/${categoryId}`, updatedData);
        return response.data;
    } catch (error) {
        console.error("Error updating category:", error);
    }
};

export const apiPostCategory = async (addData) => {
    try {
        const response = await http.post(`${urlCategories}/api/v1/categories/`, addData);
        return response.data;
    } catch (error) {
        console.error("Error adding category:", error);
    }
};
