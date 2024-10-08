<template>
    <div>
        <div class="p-4">
            <div class="flex justify-between">
                <h1 class="text-2xl font-bold mb-4">Manager Product</h1>
                <button @click="openModal('add')"
                    class="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600">
                    Add New Product
                </button>
            </div>
            <table class="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr class="bg-gray-100">
                        <th class="px-4 py-2 border text-center">STT</th>
                        <th class="px-4 py-2 border text-center">Image</th>
                        <th class="px-4 py-2 border text-center">Name</th>
                        <th class="px-4 py-2 border text-center">Price</th>
                        <th class="px-4 py-2 border text-center">Quantity</th>
                        <th class="px-4 py-2 border text-center">Option</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(product, index) in products" :key="product.id" class="text-center">
                        <td class="px-4 py-2 border">{{ index + 1 }}</td>
                        <td class="px-4 py-2 border">
                            <img :src="product.image" :alt="product.name" class="w-12 h-12 mx-auto" />
                        </td>
                        <td class="px-4 py-2 border">{{ product.name }}</td>
                        <td class="px-4 py-2 border">{{ product.price }} đ</td>
                        <td class="px-4 py-2 border">{{ product.quantity }}</td>
                        <td class="px-4 py-2 border">
                            <button @click="openModal('edit', product)"
                                class="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600">
                                Edit
                            </button>
                            <button @click="deleteProduct(product.id)"
                                class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Modal -->
        <div v-if="isModalOpen" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
            <div class="bg-white p-6 rounded shadow-md w-1/3">
                <h2 class="text-xl mb-4">{{ isEditMode ? 'Edit Product' : 'Add New Product' }}</h2>
                <form @submit.prevent="saveProduct">
                    <div class="mb-4">
                        <label class="block mb-2">Name</label>
                        <input v-model="currentProduct.name" type="text" class="border px-4 py-2 w-full" required />
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2">Image URL</label>
                        <input v-model="currentProduct.image" type="text" class="border px-4 py-2 w-full" required />
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2">Price</label>
                        <input v-model="currentProduct.price" type="text" class="border px-4 py-2 w-full" required />
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2">Quantity</label>
                        <input v-model="currentProduct.quantity" type="number" class="border px-4 py-2 w-full"
                            required />
                    </div>
                    <div class="flex justify-end">
                        <button @click="closeModal"
                            class="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
                        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">{{ isEditMode ? 'Save Changes' : 'Add Product' }}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const products = ref([]);

const isModalOpen = ref(false);
const isEditMode = ref(false);
const currentProduct = ref({ id: null, name: '', price: '', quantity: 0, image: '' });

const loadProductsFromLocalStorage = () => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
        products.value = JSON.parse(storedProducts);
    } else {
        products.value = [];
    }
};

const saveProductsToLocalStorage = () => {
    localStorage.setItem('products', JSON.stringify(products.value));
};

// open modal
const openModal = (mode, product = null) => {
    isEditMode.value = mode === 'edit';
    if (isEditMode.value && product) {
        currentProduct.value = { ...product };
    } else {
        currentProduct.value = { id: null, name: '', price: '', quantity: 0, image: '' };
    }
    isModalOpen.value = true;
};

// Close modal
const closeModal = () => {
    isModalOpen.value = false;
};

// Save product (add or edit)
const saveProduct = () => {
    if (!currentProduct.value.name.trim() || !currentProduct.value.image.trim()) {
        Swal.fire({
            title: "Error!",
            text: "Name và Image không được để trống.",
            icon: "error"
        });
        return;
    }

    const isDuplicateName = products.value.some(
        (product) => product.name.toLowerCase() === currentProduct.value.name.toLowerCase() && product.id !== currentProduct.value.id
    );
    if (isDuplicateName) {
        Swal.fire({
            title: "Error!",
            text: "Tên sản phẩm đã tồn tại.",
            icon: "error"
        });
        return;
    }

    const price = parseFloat(currentProduct.value.price);
    if (isNaN(price) || price < 10000) {
        Swal.fire({
            title: "Error!",
            text: "Giá sản phẩm phải lớn hơn hoặc bằng 10.000 đ.",
            icon: "error"
        });
        return;
    }

    const quantity = parseInt(currentProduct.value.quantity, 10);
    if (isNaN(quantity) || quantity < 1 || quantity > 100) {
        Swal.fire({
            title: "Error!",
            text: "Số lượng sản phẩm phải từ 1 đến 100.",
            icon: "error"
        });
        return;
    }

    if (isEditMode.value) {
        const index = products.value.findIndex(p => p.id === currentProduct.value.id);
        if (index !== -1) {
            products.value[index] = { ...currentProduct.value };
        }
    } else {
        const newProduct = { ...currentProduct.value, id: Date.now() };
        products.value.push(newProduct);
    }

    closeModal();
};

// Delete product
const deleteProduct = (id) => {
    Swal.fire({
        title: "Xác nhận",
        text: "Bạn có chắc muốn xoá sản phẩm này!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "delete"
    }).then((result) => {
        if (result.isConfirmed) {
            products.value = products.value.filter(product => product.id !== id);
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
    });
};

watch(products, saveProductsToLocalStorage, { deep: true });

onMounted(loadProductsFromLocalStorage);
</script>

<style scoped>

</style>
