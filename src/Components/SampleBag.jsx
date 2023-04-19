

import React, { useState, useReducer } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../Styles/SampleFormStyle.css";
// import SampleBag from "./SampleBag";

<Form>
  <FieldArray
    name="friends"
    render={arrayHelpers => (
      <div>
        {values.friends.map((friend, index) => (
          <div key={index}>
            {/** both these conventions do the same */}
            <Field name={`friends[${index}].name`} />
            <Field name={`friends.${index}.age`} />

            <button type="button" onClick={() => arrayHelpers.remove(index)}>
              -
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => arrayHelpers.push({ name: '', age: '' })}
        >
          +
        </button>
      </div>
    )}
  />
</Form>