import React from 'react';
import styles from './Input.module.scss';

const Input = React.forwardRef(
    ({
         as = 'input',
         error = '',
         className = '',
         label = '',
         customInput = false,
         options,
         ...field}, ref) => {
        const errorMessage = typeof error === 'string' ? error : error?.message || '';

        if (as === 'radio') {
            return (
                <div className={`${styles[`field`]}`}>
                    {label &&
                        <label className={`${styles[`label`]}`}>
                            {label}
                        </label>
                    }
                    <div className={styles[`radio__wrap`]}>
                        {options && options.map((option) => (
                            <label key={option.value} className={styles.radio}>
                                <input
                                    type="radio"
                                    value={option.value}
                                    name={field.name}
                                    checked={field.value === option.value}
                                    onChange={() => field.onChange(option.value)}
                                    className={styles.radioInput}
                                />
                                {option.label}
                            </label>
                        ))}
                    </div>
                    {errorMessage &&
                        <span className={`${styles[`error`]} ${errorMessage ? `${styles[`error__active`]}` : ''}`}>
                            {errorMessage}
                        </span>
                    }
                </div>
            );
        }

        const Tag = as === 'textarea' ? 'textarea' : 'input';

        return (
            <div className={`${styles[`field`]}`}>
                {label &&
                    <label className={`${styles[`label`]}`}>
                        {label}
                    </label>
                }
                {customInput === true ? (
                    <div
                        className={`${styles[`input`]} ${styles[`input__div`]} ${errorMessage ? `${styles[`input__error`]}` : ''}`}>
                        $
                        <Tag
                            className={`${styles[`input__custom`]} `}
                            onInput={(e) => {
                                e.target.value = e.target.value.replace(/\D/g, '');
                            }}
                            autoComplete="off"
                            ref={ref}
                            {...field}
                        />
                    </div>
                ) : (
                    <Tag
                        className={`${styles[`input`]} ${errorMessage ? `${styles[`input__error`]}` : ''}`}
                        ref={ref}
                        autoComplete="off"
                        {...field}
                    />
                )}
                {errorMessage &&
                    <span className={`${styles[`error`]} ${errorMessage ? `${styles[`error__active`]}` : ''}`}>
                        {errorMessage}
                    </span>
                }
            </div>
        );
    }
);

export default Input;