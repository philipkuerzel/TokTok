import { api } from "@/lib/api"
import { Link } from "react-router-dom"

const RegisterForm = () => {
  const sendFormData = async (event) => {
    event.prevent.Default()
    const form = event.target
    const inputData = new FormData(form)
    const json = await api.post("users/register", {body: inputData}).json()

    console.log(json);
  }
  return (
    <div className="w-[428px] h-[882px] px-6 pt-6 pb-12 flex-col justify-between items-center inline-flex">
    <div className="w-[380px] text-neutral-800 text-[40px] font-bold font-['Urbanist'] leading-[44px]">Create your<br/>Account</div>
    <div className="w-[140px] h-[140px] relative">
        <div className="w-[140px] h-[140px] left-0 top-0 absolute bg-gradient-to-l from-rose-500 to-red-300 rounded-[48px]"></div>
    </div>
    <form className="self-stretch h-[215px] flex-col justify-start items-start gap-8 flex" onSubmit={sendFormData}>
        <div className="h-[215px] flex-col justify-center items-center gap-5 flex">
            <div className="w-[380px] h-[60px] px-5 bg-neutral-50 rounded-xl justify-start items-center gap-3 inline-flex">
                <div className="w-5 h-5 px-[1.67px] py-[2.50px] justify-center items-center flex">
                    <img className="w-[16.67px] h-[15px]" src="https://via.placeholder.com/17x15" />
                </div>
                <div className="grow shrink basis-0 text-neutral-400 text-sm font-normal font-['Urbanist'] leading-tight tracking-tight">Email</div>
            </div>
            <div className="w-[380px] h-[60px] px-5 bg-neutral-50 rounded-xl justify-start items-center gap-3 inline-flex">
                <div className="w-5 h-5 px-[2.92px] py-[1.67px] justify-center items-center flex">
                    <img className="w-[14.17px] h-[16.67px]" src="https://via.placeholder.com/14x17" />
                </div>
                <div className="grow shrink basis-0 text-neutral-400 text-sm font-normal font-['Urbanist'] leading-tight tracking-tight">Password</div>
                <div className="w-5 h-5 px-[1.67px] py-[2.92px] justify-center items-center flex">
                    <img className="w-[16.67px] h-[14.17px]" src="https://via.placeholder.com/17x14" />
                </div>
            </div>
            <div className="w-[380px] h-[55px] px-4 py-[18px] bg-rose-400 rounded-[100px] justify-center items-center gap-2.5 inline-flex">
                <button className="grow shrink basis-0 text-center text-white text-base font-bold font-['Urbanist'] leading-snug tracking-tight">Sign up</button>
            </div>
        </div>
    </form>
    <div className="self-stretch justify-center items-center gap-2 inline-flex">
        <div className="text-right text-neutral-400 text-sm font-normal font-['Urbanist'] leading-tight tracking-tight">Already have an account?</div>
        <Link to="/auth/login" className="text-rose-500 text-sm font-semibold font-['Urbanist'] leading-tight tracking-tight">Sign in</Link>
    </div>
</div>
  )
}

export default RegisterForm