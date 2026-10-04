export enum PaymentMethod {
    COD = 'COD',
    CREDIT_CARD = 'CREDIT_CARD',
    E_WALLET = 'E_WALLET',
}

export enum OrderStatus {
    PENDING = 'PENDING',
    PLACED = 'PLACED',
    PROCESSING = 'PROCESSING',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED',
    REFUNDED = 'REFUNDED',
}
