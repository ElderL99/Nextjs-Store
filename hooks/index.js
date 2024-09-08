import { useEffect, useState } from "react";
import { getAllProducts, getProduct } from "@/utils/api";
import { router } from "next/router";

import { toast } from "sonner";

// hook para proveer la lista de productos
export function useProducts(props) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getAllProducts()
            .then((data) => setProducts(data))
            .catch((error) => console.error("[useProducts]", error));
    }, []);

    return { products };
}

// hook para obtener información del producto
export function useProduct(id) {
    const [product, setProduct] = useState({});

    useEffect(() => {
        getProduct(id)
            .then((data) => setProduct(data))
            .catch((error) => console.error("[useProduct]", error));
    }, [id]);

    return { product };
}


export function useAuth(){
    const [token, setToken] = useState("")

    useEffect(() => {
        const localStorageToken = localStorage.getItem("token")
        if (!localStorageToken) {
            toast.error("you need to login first")
            router.push("/login")
        setToken (localStorageToken);
    }
            
    }, []);
    return {token};
}
