import { api } from "../lib/api";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {

	const navigate = useNavigate();

  // data from input fields
	const sendFormData = async (event) => {
		event.preventDefault();
		const form = event.target;
		const inputData = new FormData(form);
    // try to get data from form and navigate to Home 
		try {
			const response = await api.post("users/register", { body: inputData });
			const json = await response.json();
			console.log(json);
			navigate("/login");
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<div className="w-[428px] h-[882px] px-6 pt-6 pb-12 flex-col justify-between items-center inline-flex">
			<div className="w-[380px] text-neutral-800 text-[40px] font-bold font-['Urbanist'] leading-[44px]">
				Create your
				<br />
				Account
			</div>
			<div className="w-[140px] h-[140px] relative">
				<img src="../img/Type=Logo Default, Component=Logo.svg" alt="" />
			</div>
			<form
				className="self-stretch h-[215px] flex-col justify-start items-start gap-8 flex"
				onSubmit={sendFormData}
			>
				<div className="h-[215px] flex-col justify-center items-center gap-5 flex">
					<div className="w-[380px] h-[60px] px-5 bg-black-50 rounded-xl justify-start items-center gap-3 inline-flex">
						<input
							className="w-[380px] h-[60px] px-5 bg-black-50 rounded-xl justify-start items-center gap-3 inline-flex outline-none"
							type="text"
							name="username"
							placeholder="username"
						/>
					</div>
					<div className="w-[380px] h-[60px] px-5 bg-black-50 rounded-xl justify-start items-center gap-3 inline-flex">
						<input
							className="w-[380px] h-[60px] px-5 bg-black-50 rounded-xl justify-start items-center gap-3 inline-flex outline-none"
							type="email"
							name="email"
							placeholder="email"
						/>
					</div>
					<div className="w-[380px] h-[60px] px-5 bg-black-50 rounded-xl justify-start items-center gap-3 inline-flex">
						<input
							className="w-[380px] h-[60px] px-5 bg-black-50 rounded-xl justify-start items-center gap-3 inline-flex outline-none"
							type="password"
							name="password"
							placeholder="password"
						/>
						{/* <div className="w-5 h-5 px-[2.92px] py-[1.67px] justify-center items-center flex">
							<img />
						</div>
						<div className="w-5 h-5 px-[1.67px] py-[2.92px] justify-center items-center flex">
							<img />
						</div> */}
					</div>
					<div className="w-[380px] h-[55px] px-4 py-[18px] bg-primary-500 rounded-[100px] justify-center items-center gap-2.5 inline-flex">
						<button
							type="submit"
							className="grow shrink basis-0 text-center text-primary-50 text-base font-bold font-['Urbanist'] leading-snug tracking-tight"
						>
							Sign up
						</button>
					</div>
				</div>
			</form>
			<div className="self-stretch justify-center items-center gap-2 inline-flex">
				<div className="text-right text-neutral-400 text-sm font-normal font-['Urbanist'] leading-tight tracking-tight">
					Already have an account?
				</div>
				<Link
					to="/login"
					className="text-primary-500 text-sm font-semibold font-['Urbanist'] leading-tight tracking-tight"
				>
					Sign in
				</Link>
			</div>
		</div>
	);
};

export default RegisterForm;
