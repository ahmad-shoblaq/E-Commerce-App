const generateMessage = (entity: string) => ({
    notFound: `${entity} Not Found`,
    alreadyExist: `${entity} Already Exists`,
    created: `${entity} Created Successfully`,
    updated: `${entity} Updated Successfully`,
    deleted: `${entity} Deleted Successfully`,
    found: `${entity} Found Successfully`,
    failToCreate: `${entity} Fail To Create`,
    failToUpdate: `${entity} Fail To Update`,
    failToDelete: `${entity} Fail To Delete`,
});

export const MESSAGE = {
    Category: { ...generateMessage('Category') },
    Brand: { ...generateMessage('Brand') },
    Product: { ...generateMessage('Product') },
    Coupon: { ...generateMessage('Coupon') },
    Cart: { ...generateMessage('Cart') },
    User: { ...generateMessage('User') },
    Customer: { ...generateMessage('Customer') },
    Admin: { ...generateMessage('Admin') },
    Order: { ...generateMessage('Order') },
};
