import React, { FC } from 'react';
import { Link as ExternalLink } from 'react-router-dom';

const Link: FC<Props> = ({ children, href }) => (
  <ExternalLink to={href}>{children}</ExternalLink>
);

interface Props {
  href: string;
}

export default Link;
