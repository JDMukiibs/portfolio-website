import * as React from 'react';

interface EmailTemplateProps {
    name: string;
    email: string;
    message: string;
}

export function EmailTemplate({ name, email, message }: EmailTemplateProps) {
    return (
        <div>
            <h1>Hi, Joshua!</h1>
            <p>You have received a new message from your website contact form.</p>
            <p>
                <strong>Name:</strong> {name}
            </p>
            <p>
                <strong>Email:</strong> {email}
            </p>
            <p>
                <strong>Message:</strong> {message}
            </p>
        </div>
    );
}