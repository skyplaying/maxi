import React, { memo, useEffect, useState } from 'react'
import styles from './index.module.scss'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AIGCMintContainer from './AIGCMintContainer'

const AIGCMint = () => {

  const formik = useFormik({
    initialValues: {
      text: ''
    },
    validationSchema: Yup.object({
      text: Yup.string().required('Text is required'),
    }),
    onSubmit: async (values) => {
      console.log('values', values);
    },
  });

  return (
    <div className={styles.AIGCMint}>
      <div className={styles.container}>
        <AIGCMintContainer formik={formik} />
      </div>
    </div>
  )
}

export default memo(AIGCMint)
