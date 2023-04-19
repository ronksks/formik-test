import React from "react";
import { Field, FieldArray, Form, Formik } from "formik";
import { CheckboxWithLabel, TextField } from "formik-material-ui";
import { array, boolean, number, object, string, ValidationError } from "yup";
import ScannerComponent from "./ScannerComponent";

// Here is an example of a form with an editable list.
// Next to each input are buttons for insert and remove.
// If the list is empty, there is a button to add an item.
export const SampleForm = () => (
  <div>
    <h1>Sample Bags</h1>
    <Formik
      initialValues={{
        sampleBags: [1, 22, 123548],
      }}
      onSubmit={(values) =>
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
        }, 500)
      }
      render={({ values }) => (
        <Form>
          <FieldArray
            name="sampleBags"
            render={(arrayHelpers) => (
              <div>
                {values.sampleBags.map((sampleBag, index) => (
                  <div key={index}>
                    {/** both these conventions do the same */}
                    <Field
                      name={`sampleBags[${index}].name`}
                      placeholder="Bag ID"
                    />
                    <Field
                      name={`sampleBags.${index}.'weight'`}
                      placeholder="Weight"
                    />
                    <Field
                      name={`sampleBags.${index}.'barcode'`}
                      as={ScannerComponent}
                      placeholder="BarcodeData"
                    />

                    <button
                      type="button"
                      onClick={() => arrayHelpers.remove(index)}
                    >
                      -
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    arrayHelpers.push({ name: "", weight: "", barcode: "" })
                  }
                >
                  +
                </button>
              </div>
            )}
          />
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </Form>
      )}
    />
  </div>
);
export default SampleForm;
