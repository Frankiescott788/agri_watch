import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth, db } from '../firebase/config';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function useAuth() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [organizationName, setOrganizationName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [location, setLocation] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const sign_up = async () => {
        try {
            setIsLoading(true);
            const user = await createUserWithEmailAndPassword(auth, email, password);
            const user_id = user.user?.uid;
            const new_user = {
                _id : user_id,
                firstName,
                lastName,
                email,
                organizationName,
                phoneNumber,
                location
            };
            const create_user = await addDoc(collection(db,'users'), new_user);
            if(create_user.id === user_id) {
                console.log('User created successfully');
            }
            

        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    const sign_in = async () => {
        try {
            setIsLoading(true);
            const auth_user = await signInWithEmailAndPassword(auth, email, password);
            const user_id = auth_user.user?.uid;
            if(user_id.length > 0) {
                console.log('User signed in successfully')
                navigate('/dashboard')
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    return {
        firstName,
        setFirstName,
        lastName,
        setLastName,
        email,
        setEmail,
        password,
        setPassword,
        organizationName,
        setOrganizationName,
        phoneNumber,
        setPhoneNumber,
        location,
        setLocation,
        isLoading,
        setIsLoading,
        sign_up,
        sign_in
    }
}