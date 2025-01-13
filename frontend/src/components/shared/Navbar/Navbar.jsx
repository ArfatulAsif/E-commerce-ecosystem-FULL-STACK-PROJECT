import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import PrimaryButton from '../PrimaryButton/PrimaryButton';

const Navbar = () => {
  return (
    <div className=''>
      <div className='flex justify-between mx-auto p-4'>
        
          <Link className='flex items-center gap-3' to="/">
            <Logo />
            <h1 className='text-xl font-semibold tracking-wide'>LEVEL <span className='text-orange-600 font-bold tracking-wide'>UP</span></h1>
          </Link>
        
        <ul className='flex gap-[30px] items-center'>
          <li className='cursor-pointer hover:text-orange-600 transition-all duration-150 font-semibold tracking-wide px-3 py-2 rounded-md'>Home</li>
          <li className='cursor-pointer hover:text-orange-600 transition-all duration-150 font-semibold tracking-wide px-3 py-2 rounded-md'>About Us</li>
          <li className='cursor-pointer hover:text-orange-600 transition-all duration-150 font-semibold tracking-wide px-3 py-2 rounded-md'>Contact</li>
        </ul>              
        <div>
          <PrimaryButton title={"Login"} />
        </div>     
      </div>
    </div>
  );
};

export default Navbar;