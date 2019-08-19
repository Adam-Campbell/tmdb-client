import React from 'react';
import Error from 'next/error'

export function withErrorHandling(PageComponent) {
    return function({ hasError, errorCode, ...componentProps }) {
        if (hasError) {
            return (
                <Error statusCode={errorCode} />
            );
        } else {
            return (
                <PageComponent {...componentProps} />
            )
        }
    }
}