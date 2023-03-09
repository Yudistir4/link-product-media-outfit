import { Button } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/useAuth';

const Navbar = () => {
  const logout = useAuth((state) => state.logout);
  const navigate = useNavigate();
  return (
    <div className="shadow-md w-full px-5 py-3 flex justify-end">
      <Button
        colorScheme="red"
        onClick={() => {
          logout();
          navigate('/login');
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default Navbar;
