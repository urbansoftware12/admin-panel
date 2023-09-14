import React, { useEffect, useState } from 'react'
import Button from '@/components/buttons/simple_btn'
import CardAdmin from '@/components/cards/cardadmin'
import useCategories from '@/hooks/useCategories'
import { InputText } from '@/components/InputText'
import { InputSelect } from '@/components/InputSelect'
import Loader from './loaders/loader'
import DefaultOrPic from '@/components/default_or_pic'
import Link from 'next/link'
import Spinner from './loaders/spinner'
import useProduct from '@/hooks/useProduct'
import uploadImage from '@/utils/uploadImage'
import { useFormik } from 'formik';
import { addProductSchema } from '@/mock/yupSchemas'
import toaster from '@/utils/toast_function'

const VariantItem = (props) => {
    const { index, variant, values, errors, handleChange, handleBlur, setFieldValue, propsProduct } = props
    const colors = ["#000000", "#ffffff", "#EA3838", "#4B9C19", "#3532AA", "#BC26B6", "#E1A822", "#D97133"]
    const sizes = ['S', 'M', 'L', 'Xl', 'XXL']
    const selectedSizes = variant.sizes.map(size => size.size)

    return <>
        <div key={`1000${index}`} className="w-full flex justify-between items-center">
            <h1 className="text-lg mb-3">Variant no. {index + 1}</h1>
            {index === 0 ? null :
                <button type="button" className='group text-xs text-white bg-red-500 px-2 py-1 rounded-md my-4 transition-all duration-300' onClick={() => {
                    const newVariants = [...values.variants];
                    newVariants.splice(index, 1);
                    setFieldValue('variants', newVariants);
                }}><i className="fa-solid fa-ring text-white group-hover:rotate-90 group-hover:mr-1 transition-all duration-300" />&nbsp;&nbsp;remove variant {index + 1}</button>}
        </div>
        <section className='w-full mb-6 flex flex-col gap-y-8' key={index}>
            <div className='w-full flex gap-x-6'>
                <nav className="relative w-1/2 grid grid-cols-3 justify-around gap-y-3 ">
                    {variant.images.map((imgUrl, imgIndex) => {
                        return <div key={`${index}-${imgIndex}`} className='flex flex-col gap-[10px]'>
                            <div className='w-[120px] h-[112px] border flex items-center justify-center border-[#DADADA] rounded-[15px] relative' >
                                <div className='absolute top-3 right-5'>
                                    <label className='cursor-pointer' htmlFor={`variants[${index}].images[${imgIndex}]`} ><i className="fa-solid fa-pen-to-square text-sm" /></label>
                                    <input name={`variants[${index}].images[${imgIndex}]`} encType="multipart/form-data" onChange={(e) => { setFieldValue(`variants[${index}].images[${imgIndex}]`, e.currentTarget.files[0]) }} type="file" id={`variants[${index}].images[${imgIndex}]`} className='w-0 h-0' />
                                </div>
                                <div className='w-[100px] h-[92px] overflow-hidden rounded-[15px]'>
                                    <DefaultOrPic src={imgUrl !== '' ? propsProduct ? imgUrl : URL.createObjectURL(imgUrl) : ''} />
                                </div>
                            </div>
                        </div>
                    })}
                    {errors && errors.variants && errors.variants[index] && errors.variants[index].images ? <p className='absolute text-red-400 bottom-[-19px] left-[10px] text-[11px]' >{errors.variants[index].images} </p> : null}
                </nav>
                <nav className='w-1/2'>
                    <h3 className="text-xl mb-3">Variant Color</h3>
                    <div className='flex items-center mb-6' >
                        {colors.map((color, i) => {
                            return <>
                                <label htmlFor={`${index}-${color}-${i}`} key={color} style={{
                                    backgroundColor: color,
                                    transform: variant.color == color ? "scale(1.1)" : "scale(1)",
                                    border: variant.color == color ? "2px solid #d6d6d6" : "none",
                                    boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px 0px"
                                }} className='w-5 h-5 mr-[5px] cursor-pointer rounded-full transition-all'></label>
                                <input id={`${index}-${color}-${i}`} type='radio' onChange={handleChange} key={i} name={`variants[${index}].color`} value={color} className="appearance-none !w-0 !h-0 !border-none opacity-0" />
                            </>
                        })}
                        <div className='text-[10px] flex' >
                            <input type="color" name={`variants[${index}].color`} id={`variants[${index}].color-custom`} className='w-0 h-0 appearance-none opacity-0' value={values.variants[index].color} onChange={handleChange} />
                            <label className="cursor-pointer mx-4 flex items-center" htmlFor={`variants[${index}].color-custom`}>
                                Custom
                                <div style={{ backgroundColor: values.variants[index].color, border: "2px solid #d6d6d6" }} className={`w-10 h-5 ml-3 shadow-lg rounded-full`} />
                            </label>
                        </div>
                    </div>
                    <InputText
                        label="Color Name"
                        name={`variants[${index}].color_name`}
                        value={variant.color_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.variants && errors.variants[index] && errors.variants[index].color_name ?
                            (errors.variants[index].color_name) : null
                        }
                    />
                </nav>
            </div>
            <h2 className="text-xl">Configure Sizes</h2>
            <div className="w-full flex gap-4">
                {sizes.map((size, sizeIndex) => {
                    return <nav key={sizeIndex} className='w-1/5 flex flex-col items-start'>
                        <div className="mb-5 flex items-center gap-3">
                            <input name={`variants[${index}].sizes[${sizeIndex}].size`} id={size} value={size} onChange={(e) => {
                                if (e.target.checked) {
                                    setFieldValue(`variants[${index}].sizes`, [
                                        ...variant.sizes,
                                        {
                                            size: e.target.value,
                                            quantity: 0
                                        }
                                    ]);
                                } else {
                                    setFieldValue(
                                        `variants[${index}].sizes`,
                                        variant.sizes.filter((size) => size.size !== e.target.value)
                                    );
                                }
                            }} checked={selectedSizes.includes(size)} type="checkbox" />
                            <label htmlFor={size} className='text-sm ml-[5px] mr-[10px] cursor-pointer'>{size}</label>
                        </div>
                        {selectedSizes.includes(size) ?
                            <InputText
                                type="number"
                                label={`Quantity in ${size} size`}
                                name={`variants[${index}].sizes[${sizeIndex}].quantity`}
                                value={variant.sizes.filter(s => s.size === size)[0].quantity}
                                onChange={(e) => {
                                    const { value } = e.target
                                    let SelectedSizeIndex = variant.sizes.findIndex((sizeObj => sizeObj.size === size))
                                    setFieldValue(`variants[${index}].sizes[${SelectedSizeIndex}].quantity`, value)
                                }}
                            /> : null}
                    </nav>
                })}
            </div>
        </section>
    </>
}

export default function ProductInfoPage(props) {
    const { categories, getCategories, categLoading } = useCategories()
    const { createProduct, updateProduct, productLoading } = useProduct()
    const [loader, setLoader] = useState(null)

    const CreateProduct = async (product) => {
        setLoader(<Loader status="Creating Product Instance" />)
        try {
            const productToCreate = {
                ...values, cover_image: '',
                variants: values.variants.map((variant) => {
                    return { ...variant, images: [] }
                })
            }
            const createdProduct = await createProduct(productToCreate)
            setLoader(<Loader status="Uploading Cover Image" />)
            const coverImage = await uploadImage(product.cover_image, createdProduct._id, `product-images/${createdProduct._id}/`)
            const finalVariants = []
            let variantIndex = 0
            for (const variant of product.variants) {
                setLoader(<Loader status={`Uploading Images of Variant ${variantIndex + 1}`} />)
                let newVariant = { ...JSON.parse(JSON.stringify(variant)), images: [] }
                let imgIndex = 0
                for (const image of variant.images) {
                    setLoader(<Loader status={`Uploading Images of Variant ${variantIndex + 1}: ${imgIndex} of ${variant.images.length} uploaded`} />)
                    const imgUrl = await uploadImage(image, imgIndex, `product-images/${createdProduct._id}/${createdProduct.variants[variantIndex]._id}/`)
                    newVariant.images.push(imgUrl)
                    imgIndex += 1
                }
                finalVariants.push(newVariant)
                variantIndex += 1
            }
            const finalProduct = { ...product, cover_image: coverImage, variants: finalVariants }
            setLoader(<Loader status="Merging Image URLs with Product" />)
            await updateProduct(createdProduct._id, finalProduct)
            return setLoader(null)
        } catch (e) {
            console.log(e)
            toaster("error", "Some error occurred.")
            return setLoader(null)
        }
    }
    const { values, errors, handleBlur, handleChange, handleSubmit, handleReset, touched, setFieldValue, setValues } = useFormik({
        validationSchema: addProductSchema,
        initialValues: {
            name: '',
            slug: '',
            categories: [null],
            description: '',
            cover_image: '',
            newTag: '',
            tags: [],
            price: null,
            uf_points: null,
            sale_price: null,
            gift_code: false,
            seo_details: {
                title: '',
                description: '',
                meta_keywords: ''
            },
            shipping_details: {
                width: '',
                height: '',
                weight: '',
                fees: ''
            },
            variants: [
                {
                    color: '#00000000',
                    color_name: '',
                    images: ['', '', '', '', '', ''],
                    sizes: []
                }
            ]
        },
        onSubmit: async (values) => {
            if (props.product && values._id && values._id.length > 10) {
                setLoader(<Loader status="Updating the Product" />)
                await updateProduct(props.product._id, values)
                return setLoader(null)
            }
            else return await CreateProduct(values)
        },
    })

    const handleAddVariant = () => {
        setFieldValue('variants', [...values.variants, {
            color: '#000000',
            color_name: '',
            images: ['', '', '', '', '', ''],
            sizes: []
        }]);
    };

    useEffect(() => {
        if (props.product) setValues(props.product)
        if (categories.length !== 0) return
        if (categories.length === 0) getCategories()
    }, [])

    return <>
        {loader}
        <section className="flex mt-[15px] justify-between items-center ">
            <div>
                <h1 className="font_futura text-[22px] font-medium">Add Product</h1>
                <div className="flex items-center mt-4 font_futura text-sm gap-x-3">
                    <Link href="/admin" >Home</Link> <i className="fa-solid fa-chevron-right" />
                    <Link href="/admin/products/allproducts" >Products</Link> <i className="fa-solid fa-chevron-right" />
                    <Link href="/admin/addproduct" >Add Product</Link>
                </div>
            </div>
            <div>
                <Link href="/admin/products/allproducts">
                    <Button my="my-0">View All</Button>
                </Link>
            </div>
        </section>
        <CardAdmin classes="my-5" >
            <h2 className='mx-10 px-4 pt-8 pb-4 mb-3 border-b text-2xl' >Basic Information</h2>
            <form className='px-[50px]' onSubmit={handleSubmit} onReset={handleReset}>
                <section className="w-full mb-7 flex justify-between gap-x-4">
                    <InputText
                        classes="w-1/2"
                        label="Product Name"
                        placeholder="&nbsp;"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.name && touched.name ?
                            (errors.productname) : null
                        }
                    />
                    <InputText
                        classes="w-1/2"
                        label="Slug"
                        placeholder="&nbsp;"
                        name="slug"
                        value={values.slug}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.slug && touched.slug ?
                            (errors.slug) : null
                        }
                    />
                </section>
                <section className="w-full mb-7 flex justify-between gap-x-6">
                    <div className='w-1/2 h-[428px] p-3 border border-gary-300 flex items-center justify-center rounded-2xl relative ' >
                        <div className='absolute top-5 right-7'>
                            <label className='cursor-pointer' htmlFor="filebtn" ><i className="fa-solid fa-pen-to-square" /></label>
                            <input name='cover_image' encType="multipart/form-data" onChange={(e) => { setFieldValue("cover_image", e.target.files[0]) }} type="file" id="filebtn" className='w-0 h-0' />
                        </div>
                        <div className='w-full h-full overflow-hidden rounded-xl' >
                            <DefaultOrPic mega src={values.cover_image !== '' ? props.product ? values.cover_image : URL.createObjectURL(values.cover_image) : null} />
                        </div>
                        {errors && errors.cover_image ? <p className='absolute text-red-400 bottom-[-19px] left-[10px] text-[11px]' >{errors.cover_image} </p> : null}
                    </div>
                    <nav className="relative w-1/2 h-full flex flex-col justify-between">
                        <div className="relative w-full mb-5 data_field items-center">
                            <h2 className="mb-2 font_futura text-sm text-left">Description</h2>
                            {errors && errors.description ? <p className='absolute text-red-400 bottom-[-19px] left-[10px] text-[11px]' >{errors.description} </p> : null}
                            <textarea rows={5} className="w-full p-2 bg-transparent outline-none border rounded-md border-gray-300 focus:border-yellow-700 hover:border-yellow-600 transition" type="text" value={values.description} name="description" id="description" maxLength={1000} onBlur={handleBlur} onChange={handleChange} placeholder="" />
                        </div>
                        <div className="w-full relative flex flex-col" >
                            <label className='font_futura text-sm flex items-center'>
                                Product Tags
                                <span className="font_futura_light text-xs ml-1" >(Write each tag and add individually)</span>
                            </label>
                            <span className="w-full mt-3 h-11 px-3 flex items-center border border-gray-300 focus:border-yellow-700 hover:border-yellow-600 transition rounded-lg outline-none">
                                <input
                                    className="w-full h-full py-3 outline-none"
                                    name="newTag"
                                    placeholder='shirt etc. Max 4.'
                                    autoComplete="off"
                                    value={values.newTag}
                                    onChange={handleChange}
                                />
                                <button type='button' className={`${values.tags.length > 3 ? "opacity-50 pointer-events-none" : null} p-2 bg-gold-land rounded-md text-white text-sm`}
                                    disabled={values.tags.length > 3}
                                    onClick={() => {
                                        const value = values.newTag.trim();
                                        if (value !== '') {
                                            const newTag = value
                                            if (!values.tags.includes(newTag)) {
                                                setFieldValue("tags", [...values.tags, newTag]);
                                                return setFieldValue("newTag", '')
                                            }
                                        }
                                    }}
                                >Add</button>
                            </span>
                            {errors && errors.tags ? <p className='absolute text-red-400 bottom-[-19px] left-[10px] text-[11px]' >{errors.tags} </p> : null}
                        </div>
                        <div className='w-full flex flex-wrap gap-3' >
                            {values.tags.map((tag, index) => (
                                <span key={index} className='ml-2 flex items-center gap-1'>
                                    <button className="fa-solid fa-xmark text-xs"
                                        onClick={() => {
                                            let updatedTags = values.tags.filter(t => t !== tag);
                                            return setFieldValue("tags", updatedTags);
                                        }}
                                    />
                                    <p className='text-sm'>{tag}</p>
                                </span>
                            ))}
                        </div>
                    </nav>
                </section>
                <section className="w-full mb-7 flex flex-col items-start gap-y-6">
                    <h2 className='w-full pt-8 pb-4 mb-3 border-b text-xl'>Add Categories</h2>
                    {categLoading ? <div className="relative w-3/5 flex justify-center"><Spinner variant="border-black" /></div> :
                        values.categories.map((category, categoryIndex) => {
                            return <div key={categoryIndex} className="w-full flex items-center">
                                <InputSelect
                                    classes="w-3/5"
                                    name={props.product ? `categories[${categoryIndex}]._id` : `categories[${categoryIndex}]`}
                                    value={props.product ? (category && category._id) : category}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.categories && errors.categories[categoryIndex] && touched.categories && touched.categories[categoryIndex] ?
                                        errors.categories[categoryIndex] : null
                                    }>
                                    {[{ id: null, path: "Select Category" }, ...categories?.map((cat) => ({ id: cat._id, path: cat.path }))]?.map((obj, index) => {
                                        const { id, path } = obj
                                        return <option key={index} value={id} selected={values.parent == id} disabled={index == 0}> {path} </option>
                                    })}
                                </InputSelect>
                                {categoryIndex > 0 && <button type="button" className="fa-solid fa-xmark mx-4 self-center" onClick={() => {
                                    const newCategories = [...values.categories];
                                    newCategories.splice(categoryIndex, 1);
                                    setFieldValue('categories', newCategories);
                                }} />}
                            </div>
                        })}
                    {values.categories.length >= 3 ? null :
                        <button type="button" className='group text-xs text-white bg-slate-400 px-2 py-1 rounded-md my-4 transition-all duration-300' onClick={() => setFieldValue('categories', [...values.categories, null])}><i className="fa-solid fa-plus text-white group-hover:rotate-90 group-hover:mr-1 transition-all duration-300" />&nbsp;add another category</button>
                    }
                </section>
                <h2 className='w-full pt-8 pb-4 mb-3 border-b text-xl'>Prices</h2>
                <section className="w-full mb-7 grid grid-cols-2 gap-6">
                    <InputText
                        classes="w-full"
                        label="Price"
                        placeholder="$00"
                        type="number"
                        name="price"
                        value={values.price}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.price && touched.price ? errors.price : null}
                    />
                    <InputText
                        classes="w-full"
                        label="UF Points"
                        placeholder="00"
                        type="number"
                        name="uf_points"
                        value={values.uf_points}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.uf_points && touched.uf_points ? errors.uf_points : null}
                    />
                    <div className="w-full h-11 place-self-end flex justify-between items-center">
                        Enable Gift Code <label className="switch w-[45px] md:w-11 h-6 "><input type="checkbox" name='gift_code' checked={values.gift_code} value={values.gift_code} onChange={(e) => {
                            if (values.sale_price || values.sale_price !== '') return toaster("info", "You can either enalbe Gift Code or Sale Price.")
                            handleChange(e);
                        }} /><span className="slider"></span></label>
                    </div>
                    <InputText
                        classes="w-full"
                        label="Sale Price"
                        placeholder="$00"
                        type="number"
                        name="sale_price"
                        value={values.sale_price}
                        onChange={(e) => {
                            if (values.gift_code) return toaster("info", "You can either enalbe Gift Code or Sale Price.")
                            handleChange(e);
                        }}
                        onBlur={handleBlur}
                        error={errors.sale_price && touched.sale_price ? errors.sale_price : null}
                    />
                </section>
                <h2 className='w-full pt-8 pb-4 mb-3 border-b text-xl'>Meta Data</h2>
                <section className="w-full mb-7 flex justify-between gap-x-6">
                    <nav className='w-1/2 first-of-type:flex flex-col gap-5' >
                        <h4 className='text-[20px]' >SEO Details</h4>
                        <InputText
                            classes="w-full"
                            label="SEO Title"
                            name="seo_details.title"
                            value={values.seo_details.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.seo_details && errors.seo_details.title && touched.seo_details && touched.seo_details.title ?
                                (errors.seo_details.title) : null
                            }
                        />
                        <InputText
                            classes="w-full"
                            label="SEO Description"
                            placeholder=" "
                            name="seo_details.description"
                            value={values.seo_details.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.seo_details && errors.seo_details.description && touched.seo_details && touched.seo_details.description ?
                                (errors.seo_details.description) : null
                            }
                        />
                        <InputText
                            classes="w-full"
                            label="SEO Meta Keywords"
                            placeholder=" "
                            name="seo_details.meta_keywords"
                            value={values.seo_details.meta_keywords}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.seo_details && errors.seo_details.meta_keywords && touched.seo_details && touched.seo_details.meta_keywords ?
                                (errors.seo_details.meta_keywords) : null
                            }
                        />
                    </nav>
                    <nav className='w-1/2 flex flex-col gap-5' >
                        <h4 className='text-[20px]' >Shipping Details</h4>
                        <div className='grid grid-cols-2 gap-[48px] ' >
                            <InputText
                                label="Width"
                                placeholder="Inch"
                                type="number"
                                name="shipping_details.width"
                                value={values.shipping_details.width}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.shipping_details && errors.shipping_details.width && touched.shipping_details && touched.shipping_details.width ?
                                    (errors.shipping_details.width) : null
                                }
                            />
                            <InputText
                                label="Height"
                                placeholder="Inch"
                                type="number"
                                name="shipping_details.height"
                                value={values.shipping_details.height}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.shipping_details && errors.shipping_details.height && touched.shipping_details && touched.shipping_details.height ?
                                    (errors.shipping_details.height) : null
                                }
                            />
                        </div>
                        <InputText
                            label="Weight"
                            type="number"
                            placeholder="gram"
                            name="shipping_details.weight"
                            value={values.shipping_details.weight}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.shipping_details && errors.shipping_details.weight && touched.shipping_details && touched.shipping_details.weight ?
                                (errors.shipping_details.weight) : null
                            }
                        />
                        <InputText
                            label="Shipping Fees"
                            placeholder="$"
                            type="number"
                            name="shipping_details.fees"
                            value={values.shipping_details.fees}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.shipping_details && errors.shipping_details.fees && touched.shipping_details && touched.shipping_details.fees ?
                                (errors.shipping_details.fees) : null
                            }
                        />
                    </nav>
                </section>
                <h2 className='pt-8 pb-4 mb-3 border-b text-2xl'>Add Variants ({values.variants.length})</h2>
                <section className="w-full mb-7 flex flex-col items-start">
                    {values.variants.map((variant, index) => (
                        <VariantItem
                            propsProduct={props.product}
                            index={index}
                            variant={variant}
                            values={values}
                            errors={errors}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            setFieldValue={setFieldValue}
                        />
                    ))}
                    <button type="button" className='group text-xs text-white bg-slate-400 px-2 py-1 rounded-md my-4 transition-all duration-300' onClick={handleAddVariant}><i className="fa-solid fa-plus text-white group-hover:rotate-90 group-hover:mr-1 transition-all duration-300" />&nbsp;add another one</button>
                </section>
                <section className='flex justify-end gap-[10px]'>
                    <Button loading={loader !== null ? true : false} disabled={productLoading} type="reset" bg="bg-gray-100" text="black" classes="w-1/5 border" font='font_futura'>Cancel</Button>
                    <Button loading={loader !== null ? true : false} disabled={productLoading} onClick={() => {
                        if (Object.keys(errors).length !== 0) return toaster("error", "There are still errors in the form.")
                    }} classes="w-1/5 my-0" type="submit">{props.product ? "Update" : "Publish"}</Button>
                </section>
            </form>
        </CardAdmin>
    </>
}