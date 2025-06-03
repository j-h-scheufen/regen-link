'use client';

import { Button, Textarea, useDisclosure } from '@heroui/react';
import type { Feature } from '@maptiler/geocoding-control/types';
import { Field, type FieldProps, Form, Formik } from 'formik';

import { FieldInput } from '@/components/forms';
import LocationModal from '@/components/geocode/LocationModal';
import type { EntityFormValues } from '@/types/forms';

const initialValues: EntityFormValues = {
  name: '',
  description: '',
  location: null,
  feature: null,
};

const AddEntityForm = () => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  return (
    <Formik<EntityFormValues>
      initialValues={initialValues}
      onSubmit={(values) => {
        // handle submit
        console.log(values);
      }}
    >
      {({ values, setFieldValue, dirty, isValid, isSubmitting }) => (
        <Form className="flex flex-col gap-4 max-w-md w-full mx-auto p-4">
          <Field name="name" label="Name" placeholder="Enter entity name" as={FieldInput} />
          <Field name="description">
            {({ field, meta }: FieldProps) => (
              <Textarea
                {...field}
                label="Description"
                placeholder="Enter a short description"
                errorMessage={meta.error}
                isInvalid={meta.touched && !!meta.error}
                className="w-full"
              />
            )}
          </Field>
          <div>
            <Button type="button" color="secondary" onPress={onOpen} className="mb-2">
              {values.feature
                ? `Edit Location: ${values.feature?.properties?.name ?? 'Selected'}`
                : 'Enter Location'}
            </Button>
          </div>
          <LocationModal
            placement="center"
            isOpen={isOpen}
            onClose={onClose}
            onOpenChange={onOpenChange}
            initialFeature={values.feature as Feature | null}
            onConfirm={(feature: Feature, coordinates: [number, number]) => {
              setFieldValue('feature', feature);
              setFieldValue('location', coordinates);
              onClose();
            }}
          />
          <Button
            type="submit"
            color="primary"
            isLoading={isSubmitting}
            disabled={!dirty || !isValid}
            className="mt-4"
          >
            Add Entity
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddEntityForm;
