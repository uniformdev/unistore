import React, { useState } from 'react';
import ActionButton, { ActionButtonProps } from '@/components/atoms/ActionButton';
import { useCartContext } from '@/context/CartProvider';

enum ButtonStates {
  Initial,
  Loading,
}

export type ButtonAddToCartProps = {
  product: Type.Product;
  quantity?: number;
};

const ButtonAddToCart = ({
  product,
  quantity = 1,
  ...otherProps
}: React.HTMLProps<HTMLButtonElement> & ActionButtonProps & ButtonAddToCartProps) => {
  const { add, setModalOpen } = useCartContext();
  const [buttonState, setButtonState] = useState<ButtonStates>(ButtonStates.Initial);
  const { id, variantId } = product;

  const handleClick = () => {
    if (buttonState === ButtonStates.Initial) {
      setButtonState(ButtonStates.Loading);
      add(id ?? 0, variantId, quantity)
        .then(() => {
          setButtonState(ButtonStates.Initial);
          setModalOpen(true);
        })
        .catch(() => setButtonState(ButtonStates.Initial));
    }
  };

  return (
    <ActionButton onClick={handleClick} isLoading={buttonState === ButtonStates.Loading} {...otherProps}>
      <span>Add to Cart</span>
    </ActionButton>
  );
};

export default ButtonAddToCart;
