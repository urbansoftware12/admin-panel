import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import DeleteAction from '@/components/modals/deleteAction';
import CardAdmin from "@/components/cards/cardadmin";
import { SearchIcon } from '@/public/sidebaricons/SearchIcon';
import Spinner from '@/components/loaders/spinner';
import Button from "@/components/buttons/simple_btn";
import LinkBtn from '@/components/buttons/link_btn';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useCategories from '@/hooks/useCategories';
import useProduct from '@/hooks/useProduct';
import { productListTableColumns } from '@/mock/tablesdata';

export default function AllProducts() {
    const { categories, getCategories, categLoading } = useCategories()
    const { products, getProducts, productLoading, totalProducts, deleteProducts, selectedProducts, setSelectedProducts, setProductInfo } = useProduct()
    const [categoryOption, setCategoryOption] = useState(false)
    const [deleteModal, setDeleteModal] = useState(null)
    const [query, setQuery] = useState('')
    const [selectable, setSelectable] = useState(false)
    const filteredProducts = products.filter((item) => {
        if (query !== '') {
            const { _id, name } = item
            return name.toLowerCase().includes(query.toLowerCase()) || _id.includes(query)
        }
        else return true
    });

    useEffect(() => {
        const getCategoriesAndProducts = async () => {
            if (categories.length !== 0 && products.length !== 0) return
            if (categories.length === 0) await getCategories()
            if (products.length === 0) await getProducts()
        }
        getCategoriesAndProducts()
        return () =>{}
    }, [])

    const onCategoryChange = async (e) => {
        const { value } = e.target
        setCategoryOption(value)
        if (value == "false") await getProducts()
        if (value && value.length > 8) await getProducts(1, value)
    }

    const onClickDelete = () => {
        if (selectedProducts.length == 0) return
        setDeleteModal(
            <DeleteAction
                show={true}
                heading="Delete Product(s)"
                msg={`This is an irreversible action, the specified product will be deleted permanently. If it is included in a bundle, only this product will be removed from the bundle and rest of the bundle will remain intact.`}
                setDeleteModal={setDeleteModal}
                onTakeAction={() => deleteProducts(selectedProducts.map(c => c.id))}
            />
        )
    }

    return <>
        {deleteModal}
        <div className="flex mt-[15px] justify-between items-center ">
            <div>
                <h2 className="font_futura text-[22px]">Product List</h2>
                <div className="flex items-center mt-4 font_futura text-sm gap-x-3">
                    <Link href="/">Home</Link> <i className="fa-solid fa-chevron-right" />
                    <span >Products</span> <i className="fa-solid fa-chevron-right" />
                    <Link href="/allproducts">Product List</Link>
                </div>
            </div>
            <div className='flex gap-x-2'>
                <LinkBtn href="/products/addbundle" my="my-0">Create Bundle</LinkBtn>
                <LinkBtn href="/products/addproduct" my="my-0">Add Product</LinkBtn>
            </div>
        </div>

        <CardAdmin classes="px-8 py-10 mt-5">
            <div className="flex justify-between">
                <div className="flex items-center gap-[13px] " >
                    <div className='flex flex-col'>
                        <select onChange={onCategoryChange} value={categoryOption} name="category" className="w-48 h-10 px-3 border rounded-full outline-none bg-gray-50 text-black cursor-pointer" placeholder="Category">
                            {[{ _id: false, path: "All Products" }, ...categories]?.map((category) => ({ value: category._id, name: category.path }))
                                .map((obj, index) => (
                                    <option key={index} value={obj.value}> {obj.name} </option>
                                ))}
                        </select>
                    </div>
                    <div className='w-64 h-10 py-2 px-5 gap-2 flex items-center bg-gray-50 border border-gray-300 rounded-full' >
                        <SearchIcon />
                        <input
                            type="text"
                            id="search"
                            value={query}
                            onChange={(e) => { setQuery(e.target.value) }}
                            className="w-full h-4 flex items-center text-sm font_futuralt bg-transparent outline-none"
                            placeholder="Search (ID or Name)..."
                        />
                    </div>
                </div>
                <div className='flex gap-x-2'>
                    <Button my="my-0" fontSize="text-sm"
                        onClick={() => {
                            setSelectable(!selectable)
                            setSelectedProducts([])
                        }}
                        classes={selectable ? "shadow-lg shadow-[#c3992c]" : null}
                    >Select Products</Button>
                    <LinkBtn
                        my="my-0" fontSize="text-sm"
                        disabled={!selectedProducts || selectedProducts.length <= 1}
                        href="/products/addbundle"
                    >Add to Bundle</LinkBtn>
                    <Button
                        my="my-0" fontSize="text-sm"
                        disabled={!selectedProducts || selectedProducts.length == 0}
                        onClick={onClickDelete}
                    >Delete</Button>
                </div>
            </div>
            <DataTable
                className='scrollbar_x'
                responsive={true}
                customStyles={{
                    tableWrapper: {
                        style: {
                            width: "100%",
                            display: 'block',
                            overflowY: 'visible',
                            paddingBottom: "6rem"
                        }
                    },
                    head: { style: { fontSize: '13px' } },
                    rows: { style: { minHeight: "70px" } }
                }}
                pagination
                paginationServer
                paginationDefaultPage={1}
                onChangePage={(page) => getProducts(page, categoryOption)}
                paginationTotalRows={totalProducts}
                paginationPerPage={50}
                paginationRowsPerPageOptions={[50]}
                selectableRows={selectable}
                onSelectedRowsChange={(state) => setSelectedProducts(state.selectedRows)}
                clearSelectedRows={selectable}
                progressPending={categLoading || productLoading}
                progressComponent={<Spinner forBtn={true} variant="border-black" />}
                highlightOnHover
                sortIcon={<span>&uarr;&darr;</span>}
                columns={productListTableColumns}
                data={filteredProducts?.map(product => {
                    return {
                        id: product._id,
                        product: product.cover_image,
                        name: product.name,
                        price: product.price,
                        offer: 0,
                        purchased: 0,
                        stock: (() => {
                            let stock = 0;
                            product.variants.forEach(variant => {
                                stock += variant.stock
                            });
                            return stock
                        })(),
                        status: "Active",
                        date: product.createdAt,
                        updatedAt: product.updatedAt,
                        handleInfo: () => { setProductInfo(product) },
                        infoLink: "/products/productinfo",
                        actions: [
                            {
                                name: "Edit",
                                link: '/products/productinfo',
                                onClick: () => { setProductInfo(product) }
                            },
                            {
                                name: "Copy ID",
                                onClick: () => { navigator.clipboard.writeText(product._id) }
                            },
                            {
                                name: "Visit",
                                onClick: () => { window.open(`/products/product/${product._id}`) }
                            },
                            {
                                name: "Delete",
                                onClick: () => {
                                    setDeleteModal(
                                        <DeleteAction
                                            show={true}
                                            heading="Delete Product(s)"
                                            msg={`This is an irreversible action, the specified product will be deleted permanently. If it is included in a bundle, only this product will be removed from the bundle and rest of the bundle will remain intact.`}
                                            setDeleteModal={setDeleteModal}
                                            onTakeAction={async () => await deleteProducts([product._id])}
                                        />
                                    )
                                }
                            },
                        ]
                    }
                })}
            />
        </CardAdmin>
    </>
}