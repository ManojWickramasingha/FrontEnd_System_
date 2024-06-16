import { useForm } from "react-hook-form"
import InputField from "../../../components/general/InputField"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from 'yup';
import Button from "../../../components/general/Button";
import { useState } from "react";
import Spinner from "../../../components/general/Spinner";
import useAuth from '../../../hooks/useAuth.hook';
import toast from "react-hot-toast";

const UserSettingPage = () => {
    const { user, updateFirstNameLastName, updateUserName } = useAuth();
    const [loading, setLoading] = useState(false);

    // ----
    const updateFirstNameLastName_ = Yup.object().shape({
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is reqiured'),
    });

    // ----
    const updateUserName_ = Yup.object().shape({
        userName: Yup.string()
            .required('User Name is required'),
    });

    // ----
    const {
        control: controlFirstNameLastName,
        handleSubmit: handleSubmitFirstNameLastName,
        formState: { errors: errorsFirstNameLastName },
        reset: resetFirstNameLastName
    } = useForm({
        resolver: yupResolver(updateFirstNameLastName_),
        defaultValues: {
            firstName: '',
            lastName: ''
        }
    });

    // ----
    const {
        control: controlUserName,
        handleSubmit: handleSubmitUserName,
        formState: { errors: errorsUserName },
        reset: resetUserName
    } = useForm({
        resolver: yupResolver(updateUserName_),
        defaultValues: {
            userName: ''
        }
    });

    // ----
    const onSubmitUpdateFirstNameLastName = async(submittedData) => {
        try{
            setLoading(true);
            await updateFirstNameLastName(user.userName, submittedData.firstName, submittedData.lastName);
            // console.log(response);
            setLoading(false);
        } catch(error){
            setLoading(false);
            resetFirstNameLastName()
            toast.error('An Error occurred. Please contact admin');
        }
    };

    // ----
    const onSubmitUpdateUserName = async(submittedData) => {
        try{
            setLoading(true);
            await updateUserName(user.userName, submittedData.userName);
            setLoading(false);
        }catch(error){
            setLoading(false);
            resetUserName();
            toast.error('An Error occured. Please contact admin');
        }
    };


    // ----
    if(loading){
        return <div className="w-full">
            <Spinner />
        </div>
    }

    return (
        <div className='pageTemplate2'>
            <h1 className='text-3xl font-bold'>Setting</h1>
            <div className="pageTemplate3 items-stretch">
                <div className="grid grid-cols-3">
                    <div className="col-span-1"></div>
                    <div className="col-span-2">
                        <form onSubmit={handleSubmitFirstNameLastName(onSubmitUpdateFirstNameLastName)}>
                            {/* given diferent inputName for separately working */}
                            <InputField control={controlFirstNameLastName} label={'First Name'} inputName={'firstName'} error={errorsFirstNameLastName.firstName?.message} />
                            <InputField control={controlFirstNameLastName} label={'Last Name'} inputName={'lastName'} error={errorsFirstNameLastName.lastName?.message} />
                            <div className="flex flex-row justify-center items-center gap-3 my-3">
                                <Button variant={'secondary'} type={'button'} label={'Discard'} onClick={() => resetFirstNameLastName()} />
                                <Button variant={'primary'} type={'submit'} label={'Update'} onClick={() => {}} loading={loading} />
                            </div>
                        </form>
                        <form onSubmit={handleSubmitUserName(onSubmitUpdateUserName)}>
                            {/* given diferent inputName for separately working */}
                            <InputField control={controlUserName} label={'User Name'} inputName={'userName'} error={errorsUserName.firstName?.message} />
                            <div className="flex flex-row justify-center items-center gap-3 my-3">
                                <Button variant={'secondary'} type={'button'} label={'Discard'} onClick={() => resetUserName()} />
                                <Button variant={'primary'} type={'submit'} label={'Update'} onClick={() => {}} loading={loading} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserSettingPage