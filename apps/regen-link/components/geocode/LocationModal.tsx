// components/geocode/LocationModal.tsx
'use client';

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  type ModalProps,
} from '@heroui/react';
import type { Feature as MaptilerFeature } from '@maptiler/geocoding-control/types';
import { useEffect, useState } from 'react';

import { LocationMap } from '.';

type LocationModalProps = Omit<ModalProps, 'children'> & {
  initialFeature: MaptilerFeature | null;
  onConfirm: (feature: MaptilerFeature, coordinates: [number, number]) => void;
};

const LocationModal: React.FC<LocationModalProps> = ({
  initialFeature,
  onConfirm,
  ...modalProps
}) => {
  const [selectedFeature, setSelectedFeature] = useState<MaptilerFeature | null>(initialFeature);
  const [coordinates, setCoordinates] = useState<[number, number] | null>(
    initialFeature?.geometry?.type === 'Point'
      ? (initialFeature.geometry.coordinates as [number, number])
      : null
  );

  // Keep state in sync if initialFeature changes (e.g., when editing)
  useEffect(() => {
    setSelectedFeature(initialFeature);
    setCoordinates(
      initialFeature?.geometry?.type === 'Point'
        ? (initialFeature.geometry.coordinates as [number, number])
        : null
    );
  }, [initialFeature]);

  return (
    <Modal {...modalProps}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Select Location</ModalHeader>
            <ModalBody>
              <div className="w-full max-w-md h-80 relative rounded-lg overflow-hidden bg-white mx-auto">
                <LocationMap
                  initialFeature={initialFeature}
                  onSelectionChange={(feature, coords) => {
                    console.log('onSelectionChange coords', coords);
                    setSelectedFeature(feature);
                    setCoordinates(coords);
                  }}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  if (selectedFeature && coordinates) {
                    onConfirm(selectedFeature, coordinates);
                  }
                  onClose();
                }}
                isDisabled={!selectedFeature || !coordinates}
              >
                Confirm
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default LocationModal;
