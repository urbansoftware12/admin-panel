import * as Yup from "yup";

export const addProductSchema = Yup.object().shape({
    name: Yup.string().required("Product name is required."),
    slug: Yup.string().required("Product slug is required."),
    categories: Yup.array().of(Yup.mixed().required("Category is required.")).max(3),
    description: Yup.string().required("Description is required.").nullable(),
    cover_image: Yup.mixed().required("Cover Image is essential."),
    newTag: Yup.string().trim(),
    tags: Yup.array().of(Yup.string().required('Tag is required')),
    price: Yup.number().required("Product Price is required.").nullable(),
    uf_points: Yup.number().nullable(),
    sale_price: Yup.number().nullable(),
    seo_details: Yup.object().shape({
        title: Yup.string().required('SEO title is required.'),
        description: Yup.string().required('SEO description is required.'),
        meta_keywords: Yup.string().required('SEO keywords are required.'),
    }),
    shipping_details: Yup.object().shape({
        width: Yup.string().required('Please define the width.'),
        height: Yup.string().required('Please define the height.'),
        weight: Yup.string().required('Please define the weight.'),
    }),
    variants: Yup.array().of(
        Yup.object().shape({
            color: Yup.string().required('Variant color is required.'),
            color_name: Yup.string().required('Color name is required.'),
            images: Yup.array().min(2, 'minimum 2 images are required (if not available, then repeat images).').max(6, 'You can only upload maximum 6 images.'),
            compression_quality: Yup.number(),
            sizes: Yup.array().of(
                Yup.object().shape({
                    size: Yup.string(),
                    quantity: Yup.number()
                })
            )
        })
    )
})

export const changePasswordSchema = Yup.object({
    oldpassword: Yup.string().min(2).required("Please Enter name"),
    newpassword: Yup.string().min(6).required("Please Enter username"),
    confirmnewpassword: Yup.string()
        .required()
        .oneOf([Yup.ref("newpassword"), null], "password must match")

})
export const generalSettingSchema = Yup.object({
    addressline1: Yup.string().min(2).required("Please Enter addressline1"),
    addressline2: Yup.string().required("Please Enter addressline2"),
    city: Yup.string().required("Please Enter city"),
    state: Yup.string().required("Please Enter state"),
    country: Yup.string().required("Please Enter country"),
    postalcode: Yup.string().required("Please Enter postalcode"),

})

export const inventeryManagementSchema = Yup.object({
    holdstock: Yup.string().min(2).required("Fill this field"),
    notificationrecipients: Yup.string().required("Fill this field"),
    lowstockthreshold: Yup.string().required("Fill this field"),
    outofstockthreshold: Yup.string().required("Fill this field"),

})

export const couponSchema = Yup.object({
    coupon_code: Yup.string().min(5, "Coupon code must of at least 5 characters").required("Coupon code is required"),
    description: Yup.string(),
    coupon_value: Yup.number(),
    coupon_config: Yup.object().shape({
        minimum_spend: Yup.number().nullable(),
        maximum_spend: Yup.number().nullable(),
        free_shipping: Yup.boolean(),
        conjunction_use: Yup.boolean(),
        exclude_sales: Yup.boolean(),
        allowed_products: Yup.array(),
        exclude_products: Yup.array(),
        allowed_categories: Yup.array(),
        exclude_categories: Yup.array(),
    }),
    expiration_date: Yup.date(),
})