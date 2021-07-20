export default (segundo: number): string => {
    if (segundo >= 3600) {
        return new Date(segundo * 1000).toLocaleTimeString('pt-BR', {
            hour12: false,
            timeZone: 'GMT',
        });
    }

    return new Date(segundo * 1000).toLocaleTimeString('pt-BR', {
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'GMT',
    });
};
