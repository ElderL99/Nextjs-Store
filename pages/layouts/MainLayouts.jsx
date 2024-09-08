import NavBar from "@/Components/Navbar";

export default function MainLayout({children}) {
  return (
    <main>
      <NavBar />
      {children}
    </main>
  );
}
