import React, { useState, useEffect } from "react";
import axios from "axios";
import AdvertisementTypeAPI from "API/AdvertisementTypeAPI";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { ReactComponent as SvgDotPatternIcon } from "../images/dot-pattern.svg";
import PhotoUpload from "components/misc/PhotoUpload";
import MultiPhotoUpload from "components/misc/MultiPhotoUpload";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const FormContainer = styled.div`
  ${tw`p-10 sm:p-12 md:p-16 bg-primary-500 text-gray-100 rounded-lg relative`}
  form {
    ${tw`mt-4`}
  }
  h2 {
    ${tw`text-3xl sm:text-4xl font-bold`}
  }
  input,
  textarea {
    ${tw`w-full bg-transparent text-gray-100 text-base font-medium tracking-wide border-b-2 py-2 text-gray-100 hocus:border-pink-400 focus:outline-none transition duration-200`};

    ::placeholder {
      ${tw`text-gray-500`}
    }
  }
`;

const TwoColumn = tw.div`flex flex-col sm:flex-row justify-between`;
const Column = tw.div`sm:w-5/12 flex flex-col`;
const InputContainer = tw.div`relative py-5 mt-6`;
const Label = tw.label`absolute top-0 left-0 tracking-wide font-semibold text-sm`;
const Input = tw.input``;
const TextArea = tw.textarea`resize h-12`;
const SubmitButton = tw.button`w-full sm:w-32 mt-6 py-3 bg-gray-100 text-primary-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px hocus:shadow-xl`;
const Select = tw.select`w-full mt-2`;

const SvgDotPattern1 = tw(
  SvgDotPatternIcon
)`absolute bottom-0 right-0 transform translate-y-1/2 translate-x-1/2 -z-10 opacity-50 text-primary-500 fill-current w-24`;

const CreateAdvertisement = () => {
  const [advertisement, setAdvertisement] = useState({
    title: "",
    description: "",
    price: "",
    isPrice: false,
    advertisementTypeId: "",
  });

  const [advertisementTypes, setAdvertisementTypes] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadedImage, setUploadedImage] = useState();

  const handleImagesChange = (images) => {
    setUploadedImages(images);
  };

  const handleImageChange = (image) => {
    setUploadedImage(image);
  };

  useEffect(() => {
    const fetchAdvertisementTypes = async () => {
      try {
        const response = await AdvertisementTypeAPI.getAdvertisementTypes();
        if (response.IsSuccess) {
          console.log(response);
          console.log(response.Data);
          setAdvertisementTypes(response.Data);
        } else {
          console.error(
            "Error fetching advertisement types",
            response.ErrorMessage
          );
        }
      } catch (error) {
        console.error("Error fetching advertisement types", error);
      }
    };
    fetchAdvertisementTypes(); // Call the async function
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAdvertisement({
      ...advertisement,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken"); // Assuming JWT token is stored in local storage

    axios
      .post("/api/advertisement", advertisement, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        alert("Advertisement created successfully!");
        // Optionally, redirect or clear form
      })
      .catch((error) => {
        console.error("Error creating advertisement", error);
        alert("Failed to create advertisement");
      });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <Container>
        <Content>
          <FormContainer>
            <div tw="mx-auto max-w-4xl">
              <h2>Create Advertisement</h2>
              <form action="#">
                <InputContainer>
                  <Label htmlFor="title-input">Title</Label>
                  <Input
                    id="title-input"
                    type="text"
                    name="title"
                    placeholder="E.g. Homestead for rent"
                    value={advertisement.title}
                    onChange={handleInputChange}
                  />
                </InputContainer>

                <InputContainer tw="flex-1">
                  <Label htmlFor="description-input">Description</Label>
                  <TextArea
                    id="description-input"
                    type="textarea"
                    name="description"
                    placeholder="E.g. A beautiful homestead for a weekend wedding"
                    value={advertisement.description}
                    onChange={handleInputChange}
                  />
                </InputContainer>

                <InputContainer>
                  <Label htmlFor="price-input">Price</Label>
                  <Input
                    id="price-input"
                    type="number"
                    name="price"
                    placeholder="0"
                    value={advertisement.price}
                    onChange={handleInputChange}
                  />
                </InputContainer>

                <TwoColumn>
                  <Column>
                    <InputContainer>
                      <Label htmlFor="advertisementType-input">
                        Advertisement type
                      </Label>
                      <Select
                        name="advertisementTypeId"
                        value={advertisement.advertisementTypeId}
                        onChange={handleInputChange}
                        required
                      >
                        {advertisementTypes.map((type) => (
                          <option key={type.id} value={type.id}>
                            {type.name}
                          </option>
                        ))}
                      </Select>
                    </InputContainer>
                  </Column>

                  <Column>
                    <InputContainer>
                      <Label htmlFor="city-input">City</Label>
                      <Select
                        name="cityId"
                        value={advertisement.advertisementTypeId}
                        onChange={handleInputChange}
                        required
                      >
                        {advertisementTypes.map((type) => (
                          <option key={type.id} value={type.id}>
                            {type.name}
                          </option>
                        ))}
                      </Select>
                    </InputContainer>
                  </Column>
                </TwoColumn>

                <TwoColumn>
                  <Column>
                    <InputContainer>
                      <Label htmlFor="phone-input">Your Phone number</Label>
                      <Input
                        id="phone-input"
                        type="tel"
                        name="phone"
                        placeholder="+370..."
                      />
                    </InputContainer>
                  </Column>
                  <Column>
                    <InputContainer>
                      <Label htmlFor="email-input">Your Email Address</Label>
                      <Input
                        id="email-input"
                        type="email"
                        name="email"
                        placeholder="E.g. john@mail.com"
                      />
                    </InputContainer>
                  </Column>
                </TwoColumn>
                <TwoColumn>
                  <Column>
                    <InputContainer>
                      <PhotoUpload
                        title="Upload main photo"
                        onImageChange={handleImageChange}
                      />
                    </InputContainer>
                  </Column>

                  <Column>
                    <InputContainer>
                      <MultiPhotoUpload
                        maxPhotos={5}
                        title="Upload photos"
                        onImagesChange={handleImagesChange}
                      />
                    </InputContainer>
                  </Column>
                </TwoColumn>

                <SubmitButton type="submit" value="Submit">
                  Submit
                </SubmitButton>
              </form>
            </div>
            <SvgDotPattern1 />
          </FormContainer>
        </Content>
      </Container>
    </div>
  );
};

export default CreateAdvertisement;
