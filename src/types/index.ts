/* eslint-disable no-unsed-vars */



export interface SignUpParamsProps{
    email: string;
    password: string;
    firstName: string;
}

export interface SignInParamsProps {
    email: string;
    password: string;
}

export interface UserProps {
    email: string;
    firstName: string;
    lastName: string;
    token: string;
}

export interface ProductItemProps {
    isFeatured: boolean;
    id: string;
    _id: string;
    name: string;
    category: {
        id: string;
        name: string;
    }[];
    createdAt: string;
    description: string;
    discount: number;
    images: {
        public_id: string;
        url: string;
    }[];
    inStock: boolean;
    isProductNew: boolean;
    likes: [];
    manufacturer: string;
    numLikes: number;
    numReviews: number;
    price: number;
    quantity: number;
    reviews: [];
    star: number;
    subcategory: [];
    updatedAt: string;
    v: number;
    cartQuantity: number;
}

// CreateProduct component
export interface CreateProductProps {
    name: string;
    price: number;
    discount: number;
    description: string;
    quantity: number;
    category: string;
    subCategory: string;
    isFeatured: boolean;
    manufacturer?: string;
    inStock: boolean;
    isProductNew: boolean;
    images: string[];
}

export interface CartProps {
    cartItems: ProductItemProps[];
    cartTotalAmount: number;
    cartTotalQuantity: number;
}

export interface CategoryProps {
    _id: string;
    name: string;
    description: string;
    createdAt: string;
    __v: number;
    id: string;
}
export interface SubCategoryProps {
    _id: string;
    name: string;
    description: string;
    createdAt: string;
    __v: number;
    id: string;
}

export interface Recipient {
    _id: string;
    name: string;
    email: string;
    id: string;
}

export interface OrderNotification {
    _id: string;
    recipient: Recipient;
    title: string;
    message: string;
    shortId: string;
    isRead: boolean;
    createdAt: string;
    __v: number;
    id: string;
}

export interface Product {
    id: string;
    name: string;
    price: string;
    discount: number;
    images: { url: string }[];
    isFeatured: boolean;
    likes: { user: string }[];
    star?: boolean;
}

export interface FlashSaleProps {
    products: ProductItemProps[];
    userId: string;
}


export interface UserProps {
    createdAt: string;
    email: string;
    firstName: string;
    id: string;
    isAdmin: boolean;
    lastName: string;
    name: string;
    phone: string;
    cart: ProductItemProps[];
    address: AddressProps[];
    profilePicture: ProfilePicture[];
    role: string;
    likes: [];
    _id: string;
    v: number;
}

export interface AddressProps {
    city: string;
    country: string;
    id: string;
    postalCode: string;
    state: string;
    street: string;
    _id: string;
    v: number;
}

interface ProfilePicture {
    public_id: string;
    url: string;
    _id: string;
    id: string;
}
