
// 'use client';

import { Button, Spinner } from 'flowbite-react';

 const  LoaderComponent = ({buttonText}) => {
  return (
    <div className="flex flex-row gap-3">
      <Button color='White'>
        <Spinner aria-label="Spinner button example" size="sm" />
        <span className="pl-3">{buttonText}</span>
      </Button>
      {/* <Button color="gray">
        <Spinner aria-label="Alternate spinner button example" size="sm" />
        <span className="pl-3">Loading...</span>
      </Button> */}
    </div>
  );
}

export default LoaderComponent