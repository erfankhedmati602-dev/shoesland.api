exports.checkRegisterInput = (data) => {
    // info must be : name , email , phone number, password

    // check its not empty
    if (data.name.trim().length == 0 && data.email.trim().length == 0 && data.phone.trim().length == 0 && data.password.trim().length == 0) return false;

    // check email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) return false;

    // check phone number
    const cleanedPhone = data.phone.replace(/[\s\-()]/g, '');
    const phoneRegex = /^\d+$/;
    if (!phoneRegex.test(data.phone)) return false;

    // check passwrod length
    if (data.password.length > 16 && data.password.length < 6) return false;

    // All check passed
    return true
}

exports.checkLoginInput = (data) => {
    // info must be : phone number, password
    if (!data.phone && !data.password) return false;
    // check its not empty
    if (data.phone.trim().length == 0) return false;

    // check phone number
    const cleanedPhone = data.phone.replace(/[\s\-()]/g, '');
    const phoneRegex = /^\d+$/;
    if (!phoneRegex.test(cleanedPhone)) return false;

    // check passwrod length
    if (data.password.length > 16 && data.password.length < 6) return false;

    // All check passed
    return true
}

exports.checkAddProduct = (data) => {
    const allowedCategory = ["men", "women", "kids"];

    // required fields
    if (!data.name || !data.brand || !data.category || !data.type || data.price == null || !data.variants) return false;

    // Empty strings 
    if (data.name.trim().length === 0 || data.brand.trim().length === 0 || data.category.trim().length === 0 || data.type.trim().length === 0) { return false; }

    // Category validation 
    if (!allowedCategory.includes(data.category)) { return false; }

    // Price validation 
    if (typeof data.price !== "number" || data.price < 0) { return false; }

    // images handeled later
    // Variants validation 
    if (!Array.isArray(data.variants) || data.variants.length === 0) { return false; }
    for (const variant of data.variants) { if (!variant.sku || variant.size == null || !variant.color || variant.stock == null) { return false; } if (variant.sku.trim().length === 0 || variant.color.trim().length === 0) { return false; } if (typeof variant.size !== "number" || typeof variant.stock !== "number") { return false; } if (variant.stock < 0) { return false; } }

    // all passed
    return true
}