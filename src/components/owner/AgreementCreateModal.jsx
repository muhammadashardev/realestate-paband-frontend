import React, { useEffect, useMemo, useState } from 'react';
import { MdClose, MdDescription, MdCalendarToday, MdAttachMoney, MdNoteAlt } from 'react-icons/md';
import { getCurrentUser, getTenantsList } from '../../utils/api';

const emptyForm = {
    tenantId: '',
    propertyId: '',
    title: 'Rental Agreement',
    startDate: '',
    endDate: '',
    monthlyRent: '50000',
    securityDeposit: '100000',
    documentUrl: '',
    notes: 'Agreement created from frontend',
};

const isValidObjectId = (value = '') => /^[0-9a-fA-F]{24}$/.test(value.trim());

const AgreementCreateModal = ({ isOpen, onClose, onSubmit, loading, properties = [] }) => {
    const [form, setForm] = useState(emptyForm);
    const [submitError, setSubmitError] = useState('');
    const currentUser = useMemo(() => getCurrentUser(), []);
    const [tenants, setTenants] = useState([]);
    const [tenantsLoading, setTenantsLoading] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            setForm(emptyForm);
            setSubmitError('');
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            const fetchTenants = async () => {
                try {
                    setTenantsLoading(true);
                    const list = await getTenantsList();
                    setTenants(list);
                    setForm((prev) => ({
                        ...prev,
                        tenantId: list[0]?._id || list[0]?.id || '',
                        propertyId: prev.propertyId || properties[0]?._id || properties[0]?.id || '',
                    }));
                } catch (err) {
                    console.error('Error fetching tenants list:', err);
                } finally {
                    setTenantsLoading(false);
                }
            };
            fetchTenants();
        }
    }, [isOpen, properties]);

    if (!isOpen) return null;

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitError('');

        const tenantId = form.tenantId.trim();
        const propertyId = form.propertyId.trim();
        const ownerId = currentUser?._id || currentUser?.id || '';

        if (!isValidObjectId(tenantId) || !isValidObjectId(propertyId) || (ownerId && !isValidObjectId(ownerId))) {
            setSubmitError('Please use valid 24-character Mongo ObjectIds for tenantId, propertyId, and ownerId.');
            return;
        }

        const payload = {
            tenantId,
            propertyId,
            ownerId: ownerId || undefined,
            title: form.title.trim() || 'Rental Agreement',
            type: 'residential',
            startDate: form.startDate,
            endDate: form.endDate,
            durationMonths: 12,
            monthlyRent: Number(form.monthlyRent) || 0,
            securityDeposit: Number(form.securityDeposit) || 0,
            depositMonths: 2,
            paymentDay: 5,
            paymentCycle: 'monthly',
            currency: 'PKR',
            lateFeeAmount: 1000,
            lateFeeAfterDay: 10,
            maintenanceCharges: 5000,
            utilityCharges: 2000,
            gracePeriodDays: 0,
            noticePeriodDays: 30,
            renewalOption: true,
            renewalNoticeDays: 30,
            terminationClause: 'Standard termination clause',
            sublettingAllowed: false,
            petsAllowed: false,
            parkingIncluded: true,
            maintenanceResponsibility: 'Owner',
            houseRules: 'No smoking',
            termsText: 'Standard rental terms',
            documentUrl: form.documentUrl.trim() || '',
            notes: form.notes.trim() || 'Agreement created from frontend',
        };

        onSubmit(payload);
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 px-4 py-6">
            <div className="w-full max-w-3xl rounded-[28px] border border-slate-200 bg-white shadow-2xl">
                <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
                    <div>
                        <p className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-slate-400">Create agreement</p>
                        <h3 className="mt-1 text-[22px] font-extrabold text-[#112338]">Generate a new rental agreement</h3>
                        <p className="mt-1 text-sm text-slate-500">Create a contract draft for a tenant and property in just a few steps.</p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                        <MdClose size={18} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6">
                    {submitError ? (
                        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">
                            {submitError}
                        </div>
                    ) : null}

                    <div className="grid gap-4 md:grid-cols-2">
                        <label className="space-y-2">
                            <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-slate-400">Property</span>
                            <select
                                value={form.propertyId}
                                onChange={(event) => handleChange('propertyId', event.target.value)}
                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-[#B68B39] focus:bg-white"
                                required
                            >
                                <option value="">Select a property</option>
                                {properties.map((property) => (
                                    <option key={property._id || property.id} value={property._id || property.id}>
                                        {property.title || property.name || property.address || property._id || property.id}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className="space-y-2">
                            <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-slate-400">Tenant</span>
                            <select
                                value={form.tenantId}
                                onChange={(event) => handleChange('tenantId', event.target.value)}
                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-[#B68B39] focus:bg-white"
                                required
                            >
                                <option value="">Select a tenant</option>
                                {tenants.map((tenant) => (
                                    <option key={tenant._id || tenant.id} value={tenant._id || tenant.id}>
                                        {tenant.fullName} ({tenant.email})
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <label className="space-y-2">
                            <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-slate-400">Agreement title</span>
                            <input
                                value={form.title}
                                onChange={(event) => handleChange('title', event.target.value)}
                                placeholder="Rental agreement"
                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-[#B68B39] focus:bg-white"
                            />
                        </label>

                        <label className="space-y-2">
                            <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-slate-400">Document URL</span>
                            <input
                                value={form.documentUrl}
                                onChange={(event) => handleChange('documentUrl', event.target.value)}
                                placeholder="https://example.com/agreement.pdf"
                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-[#B68B39] focus:bg-white"
                            />
                        </label>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <label className="space-y-2">
                            <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-slate-400">Start date</span>
                            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                                <MdCalendarToday className="text-slate-400" size={16} />
                                <input
                                    type="date"
                                    value={form.startDate}
                                    onChange={(event) => handleChange('startDate', event.target.value)}
                                    className="w-full bg-transparent text-sm font-medium text-slate-700 outline-none"
                                    required
                                />
                            </div>
                        </label>

                        <label className="space-y-2">
                            <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-slate-400">End date</span>
                            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                                <MdCalendarToday className="text-slate-400" size={16} />
                                <input
                                    type="date"
                                    value={form.endDate}
                                    onChange={(event) => handleChange('endDate', event.target.value)}
                                    className="w-full bg-transparent text-sm font-medium text-slate-700 outline-none"
                                    required
                                />
                            </div>
                        </label>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <label className="space-y-2">
                            <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-slate-400">Monthly rent</span>
                            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                                <MdAttachMoney className="text-slate-400" size={16} />
                                <input
                                    type="number"
                                    min="0"
                                    value={form.monthlyRent}
                                    onChange={(event) => handleChange('monthlyRent', event.target.value)}
                                    placeholder="50000"
                                    className="w-full bg-transparent text-sm font-medium text-slate-700 outline-none"
                                    required
                                />
                            </div>
                        </label>

                        <label className="space-y-2">
                            <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-slate-400">Security deposit</span>
                            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                                <MdAttachMoney className="text-slate-400" size={16} />
                                <input
                                    type="number"
                                    min="0"
                                    value={form.securityDeposit}
                                    onChange={(event) => handleChange('securityDeposit', event.target.value)}
                                    placeholder="100000"
                                    className="w-full bg-transparent text-sm font-medium text-slate-700 outline-none"
                                    required
                                />
                            </div>
                        </label>
                    </div>

                    <label className="space-y-2">
                        <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-slate-400">Notes</span>
                        <div className="flex items-start gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                            <MdNoteAlt className="mt-0.5 text-slate-400" size={16} />
                            <textarea
                                value={form.notes}
                                onChange={(event) => handleChange('notes', event.target.value)}
                                rows="3"
                                placeholder="Any special terms or internal notes"
                                className="w-full bg-transparent text-sm font-medium text-slate-700 outline-none"
                            />
                        </div>
                    </label>

                    <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-2xl bg-[#0A2240] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#11315c] disabled:cursor-not-allowed disabled:bg-slate-400"
                        >
                            {loading ? 'Creating...' : 'Create Agreement'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AgreementCreateModal;
