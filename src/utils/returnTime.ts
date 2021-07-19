export default (segundo: number): string => {
    return new Date(segundo * 1000).toLocaleTimeString('pt-BR', {
        hour12: false,
        timeZone: 'GMT',
    });
};
