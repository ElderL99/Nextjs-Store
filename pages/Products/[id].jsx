//import { Link, useParams } from "react-router-dom";
import Link from "next/link";
import { useRouter } from "next/router";
import { useProduct, useAuth} from "@/hooks";
import MainLayout from "../layouts/MainLayouts";
import { useEffect, useState } from "react";




export default function ProductDetail() {
  
    const router = useRouter();
    const [token, setToken] = useState("")
    // const { id } = useParams();
    const { id } = router.query;
    const { product } = useProduct(id);
  
  useAuth()   
    
 return (
        
     <MainLayout>

            <main className="flex flex-col gap-4 justify-center items-center p-4">
                <header className="text-left w-full">
                    <Link
                        href={`/Products`}
                        className="cursor-pointer hover:text-cyan-500"
                    >
                        ⬅ Regresar
                    </Link>
                </header>
                <h1 className="text-2xl font-bold text-center">{product.title}</h1>
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="size-48"
                />
                <p className="max-w-prose">{product.description}</p>
                <p className="text-cyan-600 text-lg">{product.price}</p>
            </main>

    </MainLayout>
       
    );
}
