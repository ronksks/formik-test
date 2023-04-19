import React, { useState } from "react";
import "../Styles/SampleFormStyle.css";

import { Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import { CheckboxWithLabel, TextField } from "formik-material-ui";
import { array, boolean, number, object, string, ValidationError } from "yup";
import ScannerComponent from "./ScannerComponent";

// Here is an example of a form with an editable list.
// Next to each input are buttons for insert and remove.
// If the list is empty, there is a button to add an item.
const SampleForm = () => {
  const [showScanner, setShowScanner] = useState(false);
  const [scannedData, setScannedData] = useState("");

  return (
    <div>
      <h1>Sample Bags</h1>
      <div className="form-container">
        <div className="form-group">
          <Formik
            initialValues={{
              sampleBags: [{ name: "", weight: "", barcode: "" }],
            }}
            validationSchema={Yup.object().shape({
              // seedsWeight: Yup.number().required("Seeds weight is required"),
              sampleBags: Yup.array()
                .of(
                  Yup.object().shape({
                    // check the barcode data=>
                    barcode: Yup.string().required("Barcode is required"),
                    // weight: Yup.number().required("Weight is required"),
                  })
                )
                .required("At least one sample bag is required"),
            })}
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
                    <div className="sample-bag">
                      {values.sampleBags.map((sampleBag, index) => (
                        <div className="form-group">
                          <div key={index}>
                            <div className="form-group">
                              <Field
                                name={`sampleBags[${index}].name`}
                                component={TextField}
                                placeholder={`Sample Bag #${index + 1}`}
                              />
                              <Field
                                name={`sampleBags.${index}.weight`}
                                component={TextField}
                                placeholder="Weight"
                              />
                              <Field
                                name={`sampleBags.${index}.barcode`}
                                component={TextField}
                                placeholder="Barcode"
                              />
                            </div>
                            <div className="form-group">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => {
                                  arrayHelpers.remove(index);
                                }}
                              >
                                -
                              </button>
                              <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => {
                                  arrayHelpers.push({
                                    name: "",
                                    weight: "",
                                    barcode: "",
                                  });
                                }}
                              >
                                +
                              </button>
                            </div>
                            <div className="form-group">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => {
                                  arrayHelpers.replace(index, {
                                    ...sampleBag,
                                    barcode: "",
                                  });
                                }}
                              >
                                Clear
                              </button>
                              <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setShowScanner(true)}
                              >
                                Scan
                              </button>
                            </div>
                            <>
                              {showScanner && (
                                <div>
                                  {/* <div id={`reader-${index}`}></div> */}
                                  <ScannerComponent
                                    scannedDataFromScanner={(data) => {
                                      setScannedData(data);
                                      setShowScanner(false);

                                      // alert(data);
                                      arrayHelpers.replace(index, {
                                        ...sampleBag,
                                        barcode: data,
                                      });
                                    }}
                                    // readerId={`reader-${index}`}
                                  />
                                </div>
                              )}
                            </>
                            <button
                              type="submit"
                              className="btn submit"
                              // onClick={() => setShowScanner(true)}
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                />
                {/* end of fieldArray */}

                <pre>{JSON.stringify(values, null, 2)}</pre>
              </Form>
            )}
            // end of formik
          />
        </div>
      </div>
    </div>
  );
};

export default SampleForm;

// {
//   showScanner &&
//     arrayHelpers.replace(index, {
//       ...sampleBag,
//       barcode: (
//         <ScannerComponent
//           onScan={(data) =>
//             arrayHelpers.replace(index, {
//               ...sampleBag,
//               barcode: data,
//             })
//           }
//         />
//       ),
//     })
// }

{
  /* <div className="form-group">
        <label htmlFor={`sampleBags.${index}.barcode`}>Barcode:</label>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setShowScanner(!showScanner)}
        >
          Scan
        </button>
        {showScanner && (
          <div>
            {/* <div id={`reader-${index}`}></div> */
}
// <ScannerComponent
//   scannedDataFromScanner={(data) => {
//     setScannedData(data);
//     setShowScanner(false);
//   }}
// readerId={`reader-${index}`}
//     />
//   </div>
// )} */}
