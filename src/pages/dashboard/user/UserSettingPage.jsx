import { useForm } from "react-hook-form"
import InputField from "../../../components/general/InputField"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from 'yup';
import Button from "../../../components/general/Button";
import { useEffect, useState } from "react";
import Spinner from "../../../components/general/Spinner";
import useAuth from '../../../hooks/useAuth.hook';
import toast from "react-hot-toast";
import { FaCamera } from 'react-icons/fa';
import axiosInstance from "../../../utils/axiosInstance";
import { ADD_USER_IMAGE } from '../../../utils/globalConfig';

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
    const onSubmitUpdateFirstNameLastName = async (submittedData) => {
        try {
            setLoading(true);
            await updateFirstNameLastName(user.userName, submittedData.firstName, submittedData.lastName);
            // console.log(response);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            resetFirstNameLastName()
            toast.error('An Error occurred. Please contact admin');
        }
    };

    // ----
    const onSubmitUpdateUserName = async (submittedData) => {
        try {
            setLoading(true);
            await updateUserName(user.userName, submittedData.userName);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            resetUserName();
            toast.error('An Error occured. Please contact admin');
        }
    };

    //-----
    const handleFileChange = async(event) => {
        if (!event.target.files[0]) {
            toast.error('please select an image');
            return;
        }

        let formData = new FormData();
        formData.append('ImageFile', event.target.files[0]); // selectedFile should be the file object

        try {
            setLoading(true);
            await axiosInstance.post(ADD_USER_IMAGE, formData);
            setLoading(false);
            toast.success('user image added sucessfully');
        } catch (error) {
            setLoading(false);
            toast.error('An error occurred. Please contact admin');
        } finally {
            setImageFile(null);
        }
    };

    // ----
    if (loading) {
        return <div className="w-full">
            <Spinner />
        </div>
    }

    return (
        <div className='pageTemplate2'>
            <h1 className='text-3xl font-bold'>Setting</h1>
            <div className="pageTemplate3 items-stretch">
                <div className="grid grid-cols-3">
                    <div className="col-span-1">
                        <form>
                            <div className="relative w-full flex justify-center">
                                <img src="https://th.bing.com/th/id/R.13b51ac382a5f8d7a535631ee300e835?rik=jw%2fJuxTP2zNELQ&pid=ImgRaw&r=0"
                                    className="h-[220px] w-[220px] rounded-full object-cover border-8" />
                                {/* input element id == lable element htmlFor */}
                                <input type="file" id="file" className="hidden" onChange={handleFileChange} />
                                <label htmlFor='file' className="absolute bottom-3 right-20 text-3xl text-[#a2a8a6]"><FaCamera /></label>
                            </div>
                            <div className="w-full flex justify-center gap-4 mt-3">
                                <Button variant={'secondary'} type={'button'} label={'Update'} onClick={() => { }} loading={loading} />
                                <Button variant={'primary'} type={'button'} label={'Delete'} onClick={() => { }} loading={loading} />
                            </div>
                        </form>
                    </div>
                    <div className="col-span-2">
                        <form onSubmit={handleSubmitFirstNameLastName(onSubmitUpdateFirstNameLastName)}>
                            {/* given diferent inputName for separately working */}
                            <InputField control={controlFirstNameLastName} label={'First Name'} inputName={'firstName'} error={errorsFirstNameLastName.firstName?.message} />
                            <InputField control={controlFirstNameLastName} label={'Last Name'} inputName={'lastName'} error={errorsFirstNameLastName.lastName?.message} />
                            <div className="flex flex-row justify-center items-center gap-3 my-3">
                                <Button variant={'secondary'} type={'button'} label={'Discard'} onClick={() => resetFirstNameLastName()} />
                                <Button variant={'primary'} type={'submit'} label={'Update'} onClick={() => { }} loading={loading} />
                            </div>
                        </form>
                        <form onSubmit={handleSubmitUserName(onSubmitUpdateUserName)}>
                            {/* given diferent inputName for separately working */}
                            <InputField control={controlUserName} label={'User Name'} inputName={'userName'} error={errorsUserName.userName?.message} />
                            <div className="flex flex-row justify-center items-center gap-3 my-3">
                                <Button variant={'secondary'} type={'button'} label={'Discard'} onClick={() => resetUserName()} />
                                <Button variant={'primary'} type={'submit'} label={'Update'} onClick={() => { }} loading={loading} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserSettingPage