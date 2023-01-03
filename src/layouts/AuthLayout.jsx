import { Outlet } from "react-router"

const AuthLayout = () => {
    return (
        <div className="bg-gray-100 dark:bg-slate-900 min-h-screen relative overflow-hidden flex justify-center items-center py-5 md:py-0">     

            {/* ------------------------Burbujas------------------------ */}
            <div className="w-[500px] h-[500px] rounded-full absolute bottom-[-200px] left-[-200px] bg-slate-300"></div>

            <div className="w-[150px] h-[150px] rounded-full absolute bottom-[225px] left-[-50px] bg-slate-500 opacity-20"></div>

            <div className="w-[600px] h-[600px] rounded-full absolute top-[-225px] right-[-350px] bg-slate-200"></div>

            
            <main className="md:w-2/3 lg:w-1/2 xl:w-1/3 px-5 relative z-20">
                <div className="">
                    <Outlet/>
                </div>  
            </main> 
        </div>
    )
}

export default AuthLayout