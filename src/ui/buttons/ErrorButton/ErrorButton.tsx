import React, {FunctionComponent} from 'react';
import { Button, ButtonProps, ERROR } from "../Button/Button";

export const ErrorButton: FunctionComponent<ButtonProps> = props => <Button intent={ERROR} {...props} />