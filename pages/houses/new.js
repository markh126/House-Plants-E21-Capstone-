import Head from 'next/head';
import React from 'react';
import HouseForm from '../../components/forms/HouseForm';

export default function NewHouse() {
  return (
    <>
      <Head>
        <title>New House Form</title>
      </Head>
      <HouseForm />
    </>
  );
}
