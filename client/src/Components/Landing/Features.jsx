import React from 'react'


const Features = ({ icon: Icon, title, description }) => {

  return (
    <div>
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
        <Icon className="h-9 w-9 text-gray-700" />
      </div>
      <h3 className="mt-8 text-lg font-semibold text-black">{title}</h3>
      <p className="mt-4 text-sm text-gray-600">{description}</p>
    </div>
  );
}


export default Features