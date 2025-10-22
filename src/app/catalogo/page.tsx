"use client";

import { CartDrawer } from "@/components/cart/CartDrawer";
import { ProductList } from "@/components/product/ProductList";
import { Button } from "@/components/ui/button";
import { useProductStore } from "@/stores/useProductStore";
import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "next/navigation";

const Page = () => {
  const store = useProductStore();

  const {user, logout} = useUserStore();
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div>
      <header className="container flex mx-auto my-4 justify-between p-5 bg-secondary items-center rounded-2xl">
        <div className="text-3xl font-bold">loja do Reactero</div>
        <section className="flex gap-2.5">
          <div>
            {user?.name}
            
            </div>
          <Button onClick={() => handleLogout()}>sair</Button>
          <CartDrawer />
        </section>
      </header>
      <main className="container mx-auto">
        <ProductList items={store.products} />
      </main>
    </div>
  );
};

export default Page;
