

import { 
  PersonFill, 
  Envelope, 
  Handset, 
  Lock, 
  LocationArrowFill, 
  ArrowRight 
} from '@gravity-ui/icons';
import { authClient, signIn, signUp } from '@/app/lib/auth-client';


const RegistrationForm = () => {

    // const router = useRouter();


    // const {
    //     data: session,
    //     isPending, //loading state
    //     refetch
    // } = authClient.useSession()

    // console.log(session)


    // if (session){
    //     router.push("/dashboard");
    // }

  const onSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const password = e.target.password.value;
    const address = e.target.address.value;

    console.log({ name, email, phone, password, address });


    const {data, error} = await authClient.signUp.email({
      email,
      name,
      password
    }, {
        onSuccess: () => {
          router.push("/dashboard");
        }
    })

    if(error){
      console.error("Error signing up:", error);
    } else {
      console.log("User signed up:", data);
    }



  }



  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        
        <form className="space-y-5" onSubmit={onSubmit}>
          {/* Header Section */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
            <p className="text-gray-500 mt-2">Join us to get started</p>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <PersonFill width={18} height={18} />
              </div>
              <input
                type="text"
                name='name'
                placeholder="Moshud Muktadir"
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 outline-none transition-all"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Envelope width={18} height={18} />
              </div>
              <input
                type="email"
                name='email'
                placeholder="name@example.com"
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 outline-none transition-all"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Handset width={18} height={18} />
              </div>
              <input
                type="tel"
                name='phone'
                placeholder="+880 1XXX-XXXXXX"
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 outline-none transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Lock width={18} height={18} />
              </div>
              <input
                type="password"
                name='password'
                placeholder="••••••••"
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 outline-none transition-all"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none text-gray-400">
                <LocationArrowFill width={18} height={18} />
              </div>
              <textarea
                rows="2"
                name='address'
                placeholder="Your street address..."
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 outline-none transition-all"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg shadow-blue-200"
          >
            Register Now
            <ArrowRight width={18} height={18} />
          </button>

          {/* Footer Section */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account? <a href="/signin" className="text-blue-600 font-medium hover:underline">Log in</a>
          </p>
        </form>

      </div>
    </div>
  );
};

export default RegistrationForm;