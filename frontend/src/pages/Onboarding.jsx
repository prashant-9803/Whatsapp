import React, { useState } from "react";
import { useSelector } from "react-redux";
import Input from "../components/common/Input";
import Avatar from "../components/common/Avatar";

const Onboarding = () => {

  const {user} = useSelector(state => state.auth);
  const [name, setName] = useState(user?.name || '');
  const [about, setAbout] = useState("")
  const [image, setImage] = useState("/default_avatar.png")

  return (
    <div className="bg-panel-header-background h-screen w-screen text-white flex flex-col items-center justify-center  ">
      <div className="flex items-center justify-center w-[20%]">
        <img src="/whatsapp.gif" alt="whatsapp"></img>
        <span className="text-7xl">Whatsapp</span>
      </div>

      <h2 className="text-2xl">Create Your Profile</h2>
      <div className="flex gap-6 mt-6">
        <div className="flex capitalize flex-col items-center justify-center mt-5 gap-6">
          <Input name="Display Name" state={name} setState={setName} label={true}/>
          <Input name="About" state={about} setState={setAbout} label={true}/>
        </div>

        <div>
          <Avatar type="xl" image={image} setImage={setImage}/>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
