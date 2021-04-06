import styled from 'styled-components';

const Flex = styled.div`
  display: flex;
`;

const FlexAlignItemsCenter = styled(Flex)`
  align-items: center;
`;

const FlexJustifyBetween = styled(Flex)`
  justify-content: space-between;
`;

const FlexCenter = styled(FlexAlignItemsCenter)`
  justify-content: center;
`;

const FlexBetweenAndCenter = styled(FlexAlignItemsCenter)`
  justify-content: space-between;
  max-width: ${({ maxWidth }) => maxWidth || ''};
  margin: 0 auto;
`;

export {
  Flex,
  FlexAlignItemsCenter,
  FlexJustifyBetween,
  FlexCenter,
  FlexBetweenAndCenter,
};
