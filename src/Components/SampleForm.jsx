import React, { useState, useEffect, useReducer } from "react";
import "../Styles/SampleFormStyle.css";

import { Field, FieldArray, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CheckboxWithLabel, TextField } from "formik-material-ui";
// import { array, boolean, number, object, string, ValidationError } from "yup";
import ScannerComponent from "./ScannerComponent";

const SampleForm = () => {
  const [scanner, setScanner] = useState([{ id: 0, isOpen: false }]);
  const [scannedData, setScannedData] = useState("");
  const [bagNumber, setBagNumber] = useState(1);

  const showScannerHandler = (idx, isOpen) => {
    console.log(scanner);
    console.log("index: " + idx);
    console.log("property name: " + isOpen);
    let newArr = [...scanner]; // copying the old datas array
    // a deep copy is not needed as we are overriding the whole object below, and not setting a property of it. this does not mutate the state.
    newArr[idx] = { id: idx, isOpen: isOpen }; // replace e.target.value with whatever you want to change it to

    setScanner(newArr);
  };
  const isOpen = (idx) => {
    console.log(idx);
    return scanner[idx].isOpen;
  };

  return (
    <div className="form-container">
      <h1>Sample Bags</h1>
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
          <Form className="form">
            <div className="form-group">
              <label htmlFor="seedsWeight">Seeds weight (grams):</label>
              <Field type="text" id="seedsWeight" name="seedsWeight" />
              <ErrorMessage
                className="error"
                component="div"
                name="seedsWeight"
              />
            </div>

            <FieldArray
              name="sampleBags"
              render={(arrayHelpers) => (
                <div className="sample-bag">
                  {values.sampleBags.map((sampleBag, index) => (
                    <div key={index}>
                      <div className="form-group">
                        <Field
                          id={`sampleBags[${index}].name`}
                          name={`sampleBags[${index}].name`}
                          component={TextField}
                          placeholder={`Sample Bag #${index + 1}`}
                        />
                        <ErrorMessage
                          className="error"
                          component="div"
                          name={`sampleBags.${index}.name`}
                        />
                        <Field
                          id={`sampleBags.${index}.weight`}
                          name={`sampleBags.${index}.weight`}
                          component={TextField}
                          placeholder="Weight"
                        />
                        <ErrorMessage
                          className="error"
                          component="div"
                          name={`sampleBags.${index}.weight`}
                        />
                        <Field
                          id={`sampleBags.${index}.barcode`}
                          name={`sampleBags.${index}.barcode`}
                          component={TextField}
                          placeholder="Barcode"
                        />
                        <ErrorMessage
                          className="error"
                          component="div"
                          name={`sampleBags.${index}.barcode`}
                        />
                      </div>
                      <div className="form-group">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => {
                            arrayHelpers.remove(index);
                            setBagNumber((prevBagNumber) => prevBagNumber - 1);
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
                              scanner: ScannerComponent,
                            });
                            setBagNumber((prevBagNumber) => prevBagNumber + 1);
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
                          onClick={showScannerHandler.bind("", index, true)}
                        >
                          Scan Barcode
                        </button>
                      </div>
                      <>
                        {isOpen(index) && (
                          <div>
                            <ScannerComponent
                              scannedDataFromScanner={(data) => {
                                setScannedData(data);
                                showScannerHandler.bind("", index, true);

                                arrayHelpers.replace(index, {
                                  ...sampleBag,
                                  barcode: data,
                                });
                              }}
                              index={index}
                            />
                          </div>
                        )}
                      </>
                    </div>
                  ))}
                  <button type="submit" className="btn submit">
                    Submit
                  </button>
                </div>
              )}
            />
            {/* end of fieldArray */}
            <button type="submit" className="btn submit">
              Submit
            </button>

            {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
          </Form>
        )}
        // end of formik
      />
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
