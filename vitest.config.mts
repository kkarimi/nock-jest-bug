import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        sequence: {
            shuffle: false,
            concurrent: false
        },
        environment: "node",
        deps: {
            interopDefault: true
        }
    },
});