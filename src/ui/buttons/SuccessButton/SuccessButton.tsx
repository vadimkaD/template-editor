import React, {FunctionComponent} from 'react';
import { Button, ButtonProps, SUCCESS } from "../Button/Button";

export const SuccessButton: FunctionComponent<ButtonProps> = props => <Button intent={SUCCESS} {...props} />