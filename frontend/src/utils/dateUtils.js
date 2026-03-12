export function formatarData(dataIso){
    if(!dataIso) return '';

    return new Date(dataIso).toLocaleDateString('pt-Br', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
}