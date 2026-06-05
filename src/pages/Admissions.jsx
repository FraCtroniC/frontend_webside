import { useEffect, useState } from 'react'
import AppLink from '../components/ui/AppLink'
import { useSiteData } from '../hooks/useSiteData'
import { requestJson } from '../services/api'

const fileAccept = '.pdf,.jpg,.jpeg,.png'
const maxFileSize = 6 * 1024 * 1024
const currentYear = new Date().getFullYear()

const nationalityOptions = ['Venezolana', 'Extranjera', 'Doble nacionalidad']

const admissionOptions = [
  { value: 'opsu', label: 'Aspirante asignado por OPSU' },
  { value: 'directo', label: 'Ingreso directo / nuevo ingreso' },
  { value: 'equivalencia', label: 'Equivalencia o traslado' },
  { value: 'convenio', label: 'Convenio institucional' },
]

const careerAreaOptions = [
  { value: 'administracion', label: 'Administracion y gestion' },
  { value: 'agroalimentacion', label: 'Agroalimentacion' },
  { value: 'educacion', label: 'Educacion' },
  { value: 'ingenieria', label: 'Ingenierias' },
  { value: 'salud', label: 'Ciencias de la salud' },
  { value: 'sociales', label: 'Ciencias sociales y juridicas' },
  { value: 'tecnologia', label: 'Tecnologia e informatica' },
  { value: 'turismo', label: 'Turismo y hoteleria' },
]

const highSchoolTypeOptions = [
  { value: 'publico', label: 'Publico' },
  { value: 'privado', label: 'Privado' },
  { value: 'tecnico', label: 'Tecnico' },
  { value: 'mision', label: 'Mision educativa / adulto' },
]

const documentFields = [
  {
    key: 'bachillerTitle',
    label: 'Titulo de bachiller',
    required: true,
    multiple: false,
    helpText: 'Adjunta una copia legible en PDF o imagen.',
  },
  {
    key: 'certifiedGrades',
    label: 'Notas certificadas',
    required: true,
    multiple: false,
    helpText: 'Preferiblemente en un solo PDF con todas las paginas.',
  },
  {
    key: 'identityCard',
    label: 'Cedula de identidad o pasaporte',
    required: true,
    multiple: false,
    helpText: 'Copia ampliada y completamente legible.',
  },
  {
    key: 'birthCertificate',
    label: 'Partida de nacimiento',
    required: true,
    multiple: false,
    helpText: 'Debe coincidir con los datos del aspirante.',
  },
  {
    key: 'photos',
    label: 'Fotografias tipo carnet',
    required: true,
    multiple: true,
    helpText: 'Carga 2 archivos o un PDF con las fotos escaneadas.',
  },
  {
    key: 'opsuProof',
    label: 'Constancia o planilla OPSU',
    required: false,
    multiple: false,
    helpText: 'Obligatoria para aspirantes asignados por OPSU.',
  },
  {
    key: 'medicalCertificate',
    label: 'Certificado medico',
    required: false,
    multiple: false,
    helpText: 'Solicitado en algunos programas o procesos institucionales.',
  },
  {
    key: 'additionalDocs',
    label: 'Documentos adicionales',
    required: false,
    multiple: true,
    helpText: 'Constancia de estudios, programa analitico, equivalencias o soportes extra.',
  },
]

const namePattern = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' -]+$/
const idPattern = /^\d{6,10}$/
const phonePattern = /^\d{10,11}$/
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const alphaInputPattern = /[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ' -]/g

const alphaOnlyFields = new Set([
  'firstName',
  'middleName',
  'firstSurname',
  'secondSurname',
  'municipality',
  'parish',
])

const digitOnlyFields = new Set(['idNumber', 'phone', 'graduationYear'])

function createInitialFormState() {
  return {
    firstName: '',
    middleName: '',
    firstSurname: '',
    secondSurname: '',
    nationality: '',
    idType: 'V',
    idNumber: '',
    birthDate: '',
    email: '',
    phone: '',
    state: '',
    municipality: '',
    parish: '',
    address: '',
    admissionModality: '',
    careerArea: '',
    careerId: '',
    semesterId: '',
    pnfProgram: '',
    highSchoolName: '',
    highSchoolType: '',
    graduationYear: '',
    observations: '',
    agreeAccuracy: false,
    agreeDataUse: false,
  }
}

function createInitialFileState() {
  return documentFields.reduce((accumulator, field) => {
    accumulator[field.key] = []
    return accumulator
  }, {})
}

function formatFileSize(sizeInBytes) {
  if (sizeInBytes < 1024) {
    return `${sizeInBytes} B`
  }

  const sizeInKilobytes = sizeInBytes / 1024

  if (sizeInKilobytes < 1024) {
    return `${sizeInKilobytes.toFixed(1)} KB`
  }

  return `${(sizeInKilobytes / 1024).toFixed(1)} MB`
}

function getFieldId(name) {
  return `preregister-${name}`
}

function getInputRestriction(name) {
  if (alphaOnlyFields.has(name)) {
    return 'letters'
  }

  if (digitOnlyFields.has(name)) {
    return 'digits'
  }

  return null
}

function sanitizeInputValue(value, restriction) {
  if (restriction === 'letters') {
    return value.replace(alphaInputPattern, '')
  }

  if (restriction === 'digits') {
    return value.replace(/\D/g, '')
  }

  return value
}

function shouldBlockInputCharacter(data, restriction) {
  if (!data || data.length !== 1) {
    return false
  }

  if (restriction === 'letters') {
    return alphaInputPattern.test(data)
  }

  if (restriction === 'digits') {
    return /\D/.test(data)
  }

  return false
}

function focusFirstInvalidField(errors) {
  const fieldOrder = [
    'firstName',
    'middleName',
    'firstSurname',
    'secondSurname',
    'nationality',
    'idType',
    'idNumber',
    'birthDate',
    'email',
    'phone',
    'state',
    'municipality',
    'parish',
    'address',
    'admissionModality',
    'careerArea',
    'careerId',
    'semesterId',
    'pnfProgram',
    'highSchoolName',
    'highSchoolType',
    'graduationYear',
    'observations',
    ...documentFields.map((field) => field.key),
    'agreeAccuracy',
    'agreeDataUse',
  ]

  const firstInvalidField = fieldOrder.find((fieldName) => errors[fieldName])

  if (!firstInvalidField) {
    return
  }

  requestAnimationFrame(() => {
    const target = document.getElementById(getFieldId(firstInvalidField))

    target?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    target?.focus?.({ preventScroll: true })
  })
}

function validateFiles(fieldKey, files, formData) {
  const field = documentFields.find((item) => item.key === fieldKey)

  if (!field) {
    return ''
  }

  if (files.length === 0) {
    return ''
  }

  if (files.some((file) => file.size > maxFileSize)) {
    return 'Cada archivo debe pesar menos de 6 MB.'
  }

  if (files.some((file) => !['application/pdf', 'image/jpeg', 'image/png'].includes(file.type))) {
    return 'Solo se aceptan archivos PDF o imagen JPG/PNG.'
  }

  if (field.key === 'photos' && files.length > 2) {
    return 'Carga como maximo 2 fotografias carnet.'
  }

  return ''
}

function validateForm(formData, fileData) {
  const errors = {}
  const trimmedFirstName = formData.firstName.trim()
  const trimmedMiddleName = formData.middleName.trim()
  const trimmedFirstSurname = formData.firstSurname.trim()
  const trimmedSecondSurname = formData.secondSurname.trim()
  const trimmedEmail = formData.email.trim()
  const trimmedPhone = formData.phone.trim()
  const trimmedAddress = formData.address.trim()
  const trimmedMunicipality = formData.municipality.trim()
  const trimmedParish = formData.parish.trim()
  const trimmedProgram = formData.pnfProgram.trim()
  const trimmedSchool = formData.highSchoolName.trim()
  const graduationYear = Number(formData.graduationYear)

  if (trimmedFirstName.length < 2 || !namePattern.test(trimmedFirstName)) {
    errors.firstName = 'Ingresa un nombre valido, sin numeros ni simbolos.'
  }

  if (trimmedMiddleName && !namePattern.test(trimmedMiddleName)) {
    errors.middleName = 'Ingresa un segundo nombre valido.'
  }

  if (trimmedFirstSurname.length < 2 || !namePattern.test(trimmedFirstSurname)) {
    errors.firstSurname = 'Ingresa el primer apellido correctamente.'
  }

  if (trimmedSecondSurname && !namePattern.test(trimmedSecondSurname)) {
    errors.secondSurname = 'Ingresa el segundo apellido correctamente.'
  }

  if (!formData.nationality) {
    errors.nationality = 'Selecciona la nacionalidad del aspirante.'
  }

  if (!['V', 'E', 'P'].includes(formData.idType)) {
    errors.idType = 'Selecciona un tipo de documento valido.'
  }

  if (!idPattern.test(formData.idNumber.trim())) {
    errors.idNumber = 'La cedula o documento debe tener entre 6 y 10 digitos.'
  }

  if (!formData.birthDate) {
    errors.birthDate = 'Indica la fecha de nacimiento.'
  } else if (new Date(formData.birthDate) > new Date()) {
    errors.birthDate = 'La fecha de nacimiento no puede estar en el futuro.'
  }

  if (!emailPattern.test(trimmedEmail)) {
    errors.email = 'Ingresa un correo electronico valido.'
  }

  if (!phonePattern.test(trimmedPhone)) {
    errors.phone = 'Ingresa un numero telefonico de 10 u 11 digitos.'
  }

  if (!formData.state) {
    errors.state = 'Selecciona el estado de residencia.'
  }

  if (!formData.municipality) {
    errors.municipality = 'Indica el municipio de residencia.'
  }

  if (!formData.parish) {
    errors.parish = 'Indica la parroquia o sector.'
  }

  if (trimmedAddress.length < 10) {
    errors.address = 'La direccion debe describirse con mayor detalle.'
  }

  if (!formData.admissionModality) {
    errors.admissionModality = 'Selecciona la modalidad de ingreso.'
  }

  if (!formData.careerArea) {
    errors.careerArea = 'Selecciona el area academica de interes.'
  }

  if (trimmedProgram.length < 4) {
    errors.pnfProgram = 'Especifica el PNF o carrera de interes.'
  }

  if (trimmedSchool.length < 4) {
    errors.highSchoolName = 'Indica el nombre completo del liceo o institucion.'
  }

  if (!formData.highSchoolType) {
    errors.highSchoolType = 'Selecciona el tipo de institucion de procedencia.'
  }

  if (!Number.isInteger(graduationYear) || graduationYear < 1990 || graduationYear > currentYear) {
    errors.graduationYear = `Indica un ano entre 1990 y ${currentYear}.`
  }

  if (formData.observations.trim().length > 500) {
    errors.observations = 'Las observaciones no pueden superar 500 caracteres.'
  }

  if (!formData.agreeAccuracy) {
    errors.agreeAccuracy = 'Debes confirmar que los datos son correctos.'
  }

  if (!formData.agreeDataUse) {
    errors.agreeDataUse = 'Debes autorizar el uso de los datos para el proceso academico.'
  }

  documentFields.forEach((field) => {
    const fileError = validateFiles(field.key, fileData[field.key], formData)

    if (fileError) {
      errors[field.key] = fileError
    }
  })

  return errors
}

function TextField({
  label,
  name,
  value,
  onChange,
  error,
  helpText,
  required = false,
  type = 'text',
  inputMode,
  autoComplete,
  placeholder,
  maxLength,
}) {
  const restriction = getInputRestriction(name)
  const describedBy = [helpText ? `${getFieldId(name)}-help` : null, error ? `${getFieldId(name)}-error` : null]
    .filter(Boolean)
    .join(' ')

  const handleBeforeInput = (event) => {
    if (shouldBlockInputCharacter(event.data, restriction)) {
      event.preventDefault()
    }
  }

  const handleChange = (event) => {
    const sanitizedValue = sanitizeInputValue(event.target.value, restriction)

    if (sanitizedValue === event.target.value) {
      onChange(event)
      return
    }

    onChange({
      ...event,
      target: {
        ...event.target,
        value: sanitizedValue,
      },
    })
  }

  return (
    <label className={`field ${error ? 'field--error' : ''}`} htmlFor={getFieldId(name)}>
      <span className="field-label">
        {label}
        {required ? <span className="field-required" aria-hidden="true">*</span> : null}
      </span>
      <input
        id={getFieldId(name)}
        name={name}
        type={type}
        value={value}
        onBeforeInput={handleBeforeInput}
        onChange={handleChange}
        autoComplete={autoComplete}
        inputMode={inputMode ?? (restriction === 'digits' ? 'numeric' : 'text')}
        pattern={restriction === 'digits' ? '[0-9]*' : undefined}
        placeholder={placeholder}
        maxLength={maxLength}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy || undefined}
      />
      {helpText ? (
        <small id={`${getFieldId(name)}-help`} className="field-help">
          {helpText}
        </small>
      ) : null}
      {error ? (
        <small id={`${getFieldId(name)}-error`} className="field-error" role="alert">
          {error}
        </small>
      ) : null}
    </label>
  )
}

function SelectField({ label, name, value, onChange, error, helpText, required = false, options, placeholder }) {
  const describedBy = [helpText ? `${getFieldId(name)}-help` : null, error ? `${getFieldId(name)}-error` : null]
    .filter(Boolean)
    .join(' ')

  return (
    <label className={`field ${error ? 'field--error' : ''}`} htmlFor={getFieldId(name)}>
      <span className="field-label">
        {label}
        {required ? <span className="field-required" aria-hidden="true">*</span> : null}
      </span>
      <select
        id={getFieldId(name)}
        name={name}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy || undefined}
      >
        <option value="">{placeholder ?? 'Selecciona una opcion'}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helpText ? (
        <small id={`${getFieldId(name)}-help`} className="field-help">
          {helpText}
        </small>
      ) : null}
      {error ? (
        <small id={`${getFieldId(name)}-error`} className="field-error" role="alert">
          {error}
        </small>
      ) : null}
    </label>
  )
}

function TextareaField({ label, name, value, onChange, error, helpText, required = false, placeholder, maxLength }) {
  const describedBy = [helpText ? `${getFieldId(name)}-help` : null, error ? `${getFieldId(name)}-error` : null]
    .filter(Boolean)
    .join(' ')

  return (
    <label className={`field field--full ${error ? 'field--error' : ''}`} htmlFor={getFieldId(name)}>
      <span className="field-label">
        {label}
        {required ? <span className="field-required" aria-hidden="true">*</span> : null}
      </span>
      <textarea
        id={getFieldId(name)}
        name={name}
        value={value}
        onChange={onChange}
        rows={4}
        placeholder={placeholder}
        maxLength={maxLength}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy || undefined}
      />
      {helpText ? (
        <small id={`${getFieldId(name)}-help`} className="field-help">
          {helpText}
        </small>
      ) : null}
      {error ? (
        <small id={`${getFieldId(name)}-error`} className="field-error" role="alert">
          {error}
        </small>
      ) : null}
    </label>
  )
}

function CheckboxField({ label, name, checked, onChange, error, helpText, required = false }) {
  const describedBy = [helpText ? `${getFieldId(name)}-help` : null, error ? `${getFieldId(name)}-error` : null]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={`checkbox-field ${error ? 'field--error' : ''}`}>
      <label htmlFor={getFieldId(name)}>
        <input
          id={getFieldId(name)}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy || undefined}
        />
        <span>
          {label}
          {required ? <span className="field-required" aria-hidden="true">*</span> : null}
        </span>
      </label>
      {helpText ? (
        <small id={`${getFieldId(name)}-help`} className="field-help">
          {helpText}
        </small>
      ) : null}
      {error ? (
        <small id={`${getFieldId(name)}-error`} className="field-error" role="alert">
          {error}
        </small>
      ) : null}
    </div>
  )
}

function FileField({ label, name, files, onChange, error, helpText, required = false, multiple = false }) {
  const describedBy = [helpText ? `${getFieldId(name)}-help` : null, error ? `${getFieldId(name)}-error` : null]
    .filter(Boolean)
    .join(' ')

  return (
    <label className={`file-field ${error ? 'field--error' : ''}`} htmlFor={getFieldId(name)}>
      <span className="field-label">
        {label}
        {required ? <span className="field-required" aria-hidden="true">*</span> : null}
      </span>
      <input
        id={getFieldId(name)}
        name={name}
        type="file"
        accept={fileAccept}
        multiple={multiple}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy || undefined}
      />
      {helpText ? (
        <small id={`${getFieldId(name)}-help`} className="field-help">
          {helpText}
        </small>
      ) : null}
      {files.length > 0 ? (
        <ul className="file-list" aria-label={`Archivos cargados para ${label}`}>
          {files.map((file) => (
            <li key={`${file.name}-${file.size}`}>
              <span>{file.name}</span>
              <span>{formatFileSize(file.size)}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {error ? (
        <small id={`${getFieldId(name)}-error`} className="field-error" role="alert">
          {error}
        </small>
      ) : null}
    </label>
  )
}

export default function Admissions() {
  const { content } = useSiteData()
  const [formData, setFormData] = useState(() => createInitialFormState())
  const [fileData, setFileData] = useState(() => createInitialFileState())
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)
  const [submission, setSubmission] = useState(null)
  const [isPreregistrationOpen, setIsPreregistrationOpen] = useState(false)
  const [catalogs, setCatalogs] = useState({
    states: [],
    municipalities: [],
    parishes: [],
    careers: [],
    semesters: [],
  })
  const [catalogError, setCatalogError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function loadCatalogs() {
      try {
        const [states, careers, semesters] = await Promise.all([
          requestJson('/states'),
          requestJson('/careers'),
          requestJson('/semesters'),
        ])

        if (cancelled) {
          return
        }

        setCatalogs((current) => ({
          ...current,
          states,
          careers,
          semesters,
        }))
        setCatalogError('')
      } catch (error) {
        if (cancelled) {
          return
        }

        setCatalogError('No se pudieron cargar los catalogos institucionales. Intenta recargar la pagina.')
      }
    }

    loadCatalogs()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    if (!formData.state) {
      setCatalogs((current) => ({
        ...current,
        municipalities: [],
        parishes: [],
      }))
      return undefined
    }

    async function loadMunicipalities() {
      try {
        const municipalities = await requestJson(`/municipalities?id_state=${formData.state}`)

        if (cancelled) {
          return
        }

        setCatalogs((current) => ({
          ...current,
          municipalities,
          parishes: [],
        }))
        setCatalogError('')
      } catch (error) {
        if (cancelled) {
          return
        }

        setCatalogs((current) => ({
          ...current,
          municipalities: [],
          parishes: [],
        }))
        setCatalogError('No se pudieron cargar los municipios del estado seleccionado.')
      }
    }

    loadMunicipalities()

    return () => {
      cancelled = true
    }
  }, [formData.state])

  useEffect(() => {
    let cancelled = false

    if (!formData.municipality) {
      setCatalogs((current) => ({
        ...current,
        parishes: [],
      }))
      return undefined
    }

    async function loadParishes() {
      try {
        const parishes = await requestJson(`/parishes?id_municipality=${formData.municipality}`)

        if (cancelled) {
          return
        }

        setCatalogs((current) => ({
          ...current,
          parishes,
        }))
        setCatalogError('')
      } catch (error) {
        if (cancelled) {
          return
        }

        setCatalogs((current) => ({
          ...current,
          parishes: [],
        }))
        setCatalogError('No se pudieron cargar las parroquias del municipio seleccionado.')
      }
    }

    loadParishes()

    return () => {
      cancelled = true
    }
  }, [formData.municipality])

  const handleInputChange = (event) => {
    const { name, type, value, checked } = event.target

    setFormData((current) => ({
      ...current,
      ...(name === 'state' ? { municipality: '', parish: '' } : {}),
      ...(name === 'municipality' ? { parish: '' } : {}),
      [name]: type === 'checkbox' ? checked : value,
    }))

    setStatus(null)
  }

  const handleFileChange = (event) => {
    const { name, files } = event.target

    setFileData((current) => ({
      ...current,
      [name]: Array.from(files ?? []),
    }))

    setStatus(null)
  }

  const handleReset = () => {
    setFormData(createInitialFormState())
    setFileData(createInitialFileState())
    setErrors({})
    setStatus(null)
    setSubmission(null)
  }

  const togglePreregistration = () => {
    setIsPreregistrationOpen((current) => !current)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const nextErrors = validateForm(formData, fileData)

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      focusFirstInvalidField(nextErrors)
      setStatus({ type: 'error', message: 'Revisa los campos resaltados antes de continuar.' })
      setSubmission(null)
      return
    }

    const aspirantName = [
      formData.firstName,
      formData.middleName,
      formData.firstSurname,
      formData.secondSurname,
    ]
      .map((value) => value.trim())
      .filter(Boolean)
      .join(' ')

    const selectedModality = admissionOptions.find((item) => item.value === formData.admissionModality)?.label ?? 'No definido'
    const selectedArea = careerAreaOptions.find((item) => item.value === formData.careerArea)?.label ?? 'No definido'
    const selectedCareer = catalogs.careers.find((item) => String(item.id_career) === formData.careerId)
    const selectedSemester = catalogs.semesters.find((item) => String(item.id_semester) === formData.semesterId)
    const selectedState = catalogs.states.find((item) => String(item.id_state) === formData.state)
    const selectedMunicipality = catalogs.municipalities.find((item) => String(item.id_municipality) === formData.municipality)
    const selectedParish = catalogs.parishes.find((item) => String(item.id_parish) === formData.parish)
    const selectedHighSchoolType = highSchoolTypeOptions.find((item) => item.value === formData.highSchoolType)?.label ?? formData.highSchoolType
    const uploadedDocuments = documentFields
      .filter((field) => fileData[field.key].length > 0)
      .map((field) => `${field.label}: ${fileData[field.key].length} archivo(s)`)

    const observations = [
      formData.observations.trim(),
      formData.pnfProgram.trim() ? `PNF solicitado: ${formData.pnfProgram.trim()}` : '',
      uploadedDocuments.length > 0 ? `Documentos cargados: ${uploadedDocuments.join(', ')}` : '',
    ]
      .filter(Boolean)
      .join('\n')

    const payload = {
      first_name: formData.firstName.trim(),
      second_name: formData.middleName.trim() || undefined,
      first_lastname: formData.firstSurname.trim(),
      second_lastname: formData.secondSurname.trim() || undefined,
      nationality: formData.nationality,
      document_type: formData.idType,
      document_id: formData.idNumber.trim(),
      birth_date: formData.birthDate,
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      id_state: Number(formData.state),
      id_municipality: Number(formData.municipality),
      id_parish: Number(formData.parish),
      full_address: formData.address.trim(),
      entry_mode: selectedModality,
      academic_area: selectedArea,
      id_career: Number(formData.careerId),
      id_semester: formData.semesterId ? Number(formData.semesterId) : undefined,
      inst_procedencia: formData.highSchoolName.trim(),
      inst_type: selectedHighSchoolType,
      grad_year: Number(formData.graduationYear),
      observations,
      status_pre: 'Pendiente',
      confirmo_info: formData.agreeAccuracy,
      autorizo_datos: formData.agreeDataUse,
    }

    setIsSubmitting(true)

    try {
      const savedPreRegistration = await requestJson('/pre-registrations', {
        method: 'POST',
        body: JSON.stringify(payload),
      })

      setStatus({
        type: 'success',
        message: 'Pre-registro enviado correctamente.',
      })
      setSubmission({
        recordId: savedPreRegistration?.verification_code ?? 'N/A',
        aspirantName,
        documentId: `${formData.idType}-${formData.idNumber.trim()}`,
        modality: selectedModality,
        area: selectedArea,
        career: selectedCareer?.name_career ?? 'No definido',
        semester: selectedSemester?.number_semester ?? 'No definido',
        state: selectedState?.name_state ?? 'No definido',
        municipality: selectedMunicipality?.name_municipality ?? 'No definido',
        parish: selectedParish?.name_parish ?? 'No definido',
        program: formData.pnfProgram.trim(),
        school: formData.highSchoolName.trim(),
        createdAt: savedPreRegistration?.created_at
          ? new Date(savedPreRegistration.created_at).toLocaleString('es-VE', {
              dateStyle: 'medium',
              timeStyle: 'short',
            })
          : new Date().toLocaleString('es-VE', {
              dateStyle: 'medium',
              timeStyle: 'short',
            }),
        uploadedDocuments,
      })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'No se pudo guardar el pre-registro.',
      })
      setSubmission(null)
    } finally {
      setIsSubmitting(false)
    }
  }

  const requirements = content?.admissions?.requirements ?? []

  return (
    <section className="section admissions-page">
      <div className="container stack admissions-layout">
        <header className="page-header fade-in">
          <h1>Admisiones y requisitos</h1>
          <p>{content?.admissions?.intro}</p>
        </header>

        <div className="admissions-grid">
          <div className="stack">
            <article className="card fade-in">
              <h3>Antes de iniciar el preregistro</h3>
              <ul>
                <li>Ten a mano tus documentos escaneados en PDF, JPG o PNG.</li>
                <li>Verifica nombres, cedula, correo y telefono antes de enviar.</li>
                <li>Si eres asignado por OPSU, prepara tambien la constancia o planilla.</li>
                <li>En equivalencias o traslado, adjunta soportes academicos adicionales.</li>
              </ul>
            </article>

            <article className="card fade-in">
              <h3>Requisitos de nuevo ingreso</h3>
              <ul>
                {requirements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>
                Para documentos oficiales, consulta la publicacion institucional y los
                avisos vigentes.
              </p>
              <AppLink href="/admissions">Revisar avisos oficiales</AppLink>
            </article>
          </div>

          <section className="preregistration-wrap fade-in">
            <div className="preregistration-header card">
              <div className="form-intro">
                <span className="badge">Preinscripcion en linea</span>
                <h2>Formulario de preregistro</h2>
                <p>
                  Completa este formulario con informacion exacta. Cada campo esta validado
                  para reducir errores comunes en el proceso de admision.
                </p>
              </div>

              <button
                className="btn btn-primary preregistration-toggle"
                type="button"
                onClick={togglePreregistration}
                aria-expanded={isPreregistrationOpen}
                aria-controls="preregistration-panel"
              >
                {isPreregistrationOpen ? 'Ocultar preregistro' : 'Abrir preregistro'}
              </button>
            </div>

            {isPreregistrationOpen ? (
              <form id="preregistration-panel" className="card form-shell fade-in" onSubmit={handleSubmit} onReset={handleReset} noValidate>
                {status ? <div className={`status-banner status-banner--${status.type}`}>{status.message}</div> : null}
                {catalogError ? <div className="status-banner status-banner--error">{catalogError}</div> : null}

                <section className="form-section">
                  <h3>Datos personales</h3>
                  <div className="form-grid">
                    <TextField
                      label="Primer nombre"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      error={errors.firstName}
                      required
                      autoComplete="given-name"
                      placeholder="Ej. Maria"
                      maxLength={40}
                    />
                    <TextField
                      label="Segundo nombre"
                      name="middleName"
                      value={formData.middleName}
                      onChange={handleInputChange}
                      error={errors.middleName}
                      autoComplete="additional-name"
                      placeholder="Opcional"
                      maxLength={40}
                    />
                    <TextField
                      label="Primer apellido"
                      name="firstSurname"
                      value={formData.firstSurname}
                      onChange={handleInputChange}
                      error={errors.firstSurname}
                      required
                      autoComplete="family-name"
                      placeholder="Ej. Perez"
                      maxLength={40}
                    />
                    <TextField
                      label="Segundo apellido"
                      name="secondSurname"
                      value={formData.secondSurname}
                      onChange={handleInputChange}
                      error={errors.secondSurname}
                      autoComplete="family-name"
                      placeholder="Opcional"
                      maxLength={40}
                    />
                    <SelectField
                      label="Nacionalidad"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleInputChange}
                      error={errors.nationality}
                      options={nationalityOptions.map((value) => ({ value, label: value }))}
                      placeholder="Selecciona la nacionalidad"
                      required
                    />
                    <div className="field field--split">
                      <label className="field" htmlFor={getFieldId('idType')}>
                        <span className="field-label">
                          Tipo de documento
                          <span className="field-required" aria-hidden="true">*</span>
                        </span>
                        <select
                          id={getFieldId('idType')}
                          name="idType"
                          value={formData.idType}
                          onChange={handleInputChange}
                          aria-invalid={Boolean(errors.idType)}
                        >
                          <option value="V">V</option>
                          <option value="E">E</option>
                          <option value="P">P</option>
                        </select>
                        {errors.idType ? (
                          <small className="field-error" role="alert">
                            {errors.idType}
                          </small>
                        ) : null}
                      </label>
                      <TextField
                        label="Numero de documento"
                        name="idNumber"
                        value={formData.idNumber}
                        onChange={handleInputChange}
                        error={errors.idNumber}
                        required
                        inputMode="numeric"
                        placeholder="Solo digitos"
                        maxLength={10}
                      />
                    </div>
                    <TextField
                      label="Fecha de nacimiento"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      error={errors.birthDate}
                      required
                      type="date"
                    />
                    <TextField
                      label="Correo electronico"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      error={errors.email}
                      required
                      type="email"
                      autoComplete="email"
                      placeholder="nombre@correo.com"
                      maxLength={120}
                    />
                    <TextField
                      label="Telefono principal"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      error={errors.phone}
                      required
                      inputMode="numeric"
                      autoComplete="tel"
                      placeholder="0412xxxxxxx"
                      maxLength={11}
                    />
                  </div>
                </section>

                <section className="form-section">
                  <h3>Residencia y contacto</h3>
                  <div className="form-grid">
                    <SelectField
                      label="Estado"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      error={errors.state}
                      options={catalogs.states.map((item) => ({ value: String(item.id_state), label: item.name_state }))}
                      placeholder="Selecciona el estado"
                      required
                    />
                    <SelectField
                      label="Municipio"
                      name="municipality"
                      value={formData.municipality}
                      onChange={handleInputChange}
                      error={errors.municipality}
                      options={catalogs.municipalities.map((item) => ({ value: String(item.id_municipality), label: item.name_municipality }))}
                      placeholder={formData.state ? 'Selecciona el municipio' : 'Primero selecciona el estado'}
                      required
                    />
                    <SelectField
                      label="Parroquia o sector"
                      name="parish"
                      value={formData.parish}
                      onChange={handleInputChange}
                      error={errors.parish}
                      options={catalogs.parishes.map((item) => ({ value: String(item.id_parish), label: item.name_parish }))}
                      placeholder={formData.municipality ? 'Selecciona la parroquia' : 'Primero selecciona el municipio'}
                      required
                    />
                    <TextField
                      label="Direccion completa"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      error={errors.address}
                      required
                      autoComplete="street-address"
                      placeholder="Calle, casa, referencia, urbanizacion"
                      maxLength={160}
                    />
                  </div>
                </section>

                <section className="form-section">
                  <h3>Perfil academico</h3>
                  <div className="form-grid">
                    <SelectField
                      label="Modalidad de ingreso"
                      name="admissionModality"
                      value={formData.admissionModality}
                      onChange={handleInputChange}
                      error={errors.admissionModality}
                      options={admissionOptions}
                      placeholder="Selecciona la modalidad"
                      required
                      helpText="La modalidad define documentos adicionales y el flujo de revision."
                    />
                    <SelectField
                      label="Area academica de interes"
                      name="careerArea"
                      value={formData.careerArea}
                      onChange={handleInputChange}
                      error={errors.careerArea}
                      options={careerAreaOptions}
                      placeholder="Selecciona el area"
                      required
                    />
                    <SelectField
                      label="Carrera"
                      name="careerId"
                      value={formData.careerId}
                      onChange={handleInputChange}
                      error={errors.careerId}
                      options={catalogs.careers.map((item) => ({ value: String(item.id_career), label: item.name_career }))}
                      placeholder="Selecciona la carrera"
                      required
                    />
                    <SelectField
                      label="Semestre de interes"
                      name="semesterId"
                      value={formData.semesterId}
                      onChange={handleInputChange}
                      error={errors.semesterId}
                      options={catalogs.semesters.map((item) => ({ value: String(item.id_semester), label: String(item.number_semester) }))}
                      placeholder="Selecciona el semestre"
                    />
                    <TextField
                      label="Programa o PNF solicitado"
                      name="pnfProgram"
                      value={formData.pnfProgram}
                      onChange={handleInputChange}
                      error={errors.pnfProgram}
                      required
                      placeholder="Ej. Informatica, Enfermeria, Administracion"
                      maxLength={80}
                    />
                    <TextField
                      label="Institucion de procedencia"
                      name="highSchoolName"
                      value={formData.highSchoolName}
                      onChange={handleInputChange}
                      error={errors.highSchoolName}
                      required
                      placeholder="Nombre del liceo o escuela tecnica"
                      maxLength={100}
                    />
                    <SelectField
                      label="Tipo de institucion"
                      name="highSchoolType"
                      value={formData.highSchoolType}
                      onChange={handleInputChange}
                      error={errors.highSchoolType}
                      options={highSchoolTypeOptions}
                      placeholder="Selecciona el tipo"
                      required
                    />
                    <TextField
                      label="Ano de egreso"
                      name="graduationYear"
                      value={formData.graduationYear}
                      onChange={handleInputChange}
                      error={errors.graduationYear}
                      required
                      inputMode="numeric"
                      placeholder={`${currentYear}`}
                      maxLength={4}
                    />
                    <TextareaField
                      label="Observaciones"
                      name="observations"
                      value={formData.observations}
                      onChange={handleInputChange}
                      error={errors.observations}
                      helpText="Aporta informacion relevante: beca, discapacidad, traslado, equivalencia u otra situacion."
                      placeholder="Escribe aqui cualquier observacion adicional..."
                      maxLength={500}
                    />
                  </div>
                </section>

                <section className="form-section">
                  <h3>Carga de documentos</h3>
                  <p className="field-help">
                    Sube archivos legibles en PDF, JPG o PNG. Se aplican validaciones de peso,
                    formato y obligatoriedad segun la modalidad.
                  </p>
                  <div className="file-grid">
                    {documentFields.map((field) => (
                      <FileField
                        key={field.key}
                        label={field.label}
                        name={field.key}
                        files={fileData[field.key]}
                        onChange={handleFileChange}
                        error={errors[field.key]}
                        helpText={field.helpText}
                        required={false}
                        multiple={field.multiple}
                      />
                    ))}
                  </div>
                </section>

                <section className="form-section">
                  <h3>Declaracion del aspirante</h3>
                  <div className="stack">
                    <CheckboxField
                      label="Confirmo que la informacion suministrada es verdadera y verificable."
                      name="agreeAccuracy"
                      checked={formData.agreeAccuracy}
                      onChange={handleInputChange}
                      error={errors.agreeAccuracy}
                      required
                    />
                    <CheckboxField
                      label="Autorizo el uso de mis datos para fines academicos y administrativos del proceso de admision."
                      name="agreeDataUse"
                      checked={formData.agreeDataUse}
                      onChange={handleInputChange}
                      error={errors.agreeDataUse}
                      helpText="Sin esta autorizacion no es posible avanzar con el preregistro."
                      required
                    />
                  </div>
                </section>

                <div className="form-actions">
                  <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Guardando preregistro...' : 'Guardar preregistro'}
                  </button>
                  <button className="btn btn-secondary" type="reset">
                    Limpiar formulario
                  </button>
                </div>

                {submission ? (
                  <aside className="submission-summary" aria-live="polite">
                    <h3>Resumen del preregistro guardado</h3>
                    <dl>
                      <div>
                        <dt>Código de pre-registro</dt>
                        <dd>{submission.recordId}</dd>
                      </div>
                      <div>
                        <dt>Aspirante</dt>
                        <dd>{submission.aspirantName}</dd>
                      </div>
                      <div>
                        <dt>Documento</dt>
                        <dd>{submission.documentId}</dd>
                      </div>
                      <div>
                        <dt>Modalidad</dt>
                        <dd>{submission.modality}</dd>
                      </div>
                      <div>
                        <dt>Area academica</dt>
                        <dd>{submission.area}</dd>
                      </div>
                      <div>
                        <dt>Carrera</dt>
                        <dd>{submission.career}</dd>
                      </div>
                      <div>
                        <dt>Semestre</dt>
                        <dd>{submission.semester}</dd>
                      </div>
                      <div>
                        <dt>Estado</dt>
                        <dd>{submission.state}</dd>
                      </div>
                      <div>
                        <dt>Municipio</dt>
                        <dd>{submission.municipality}</dd>
                      </div>
                      <div>
                        <dt>Parroquia</dt>
                        <dd>{submission.parish}</dd>
                      </div>
                      <div>
                        <dt>PNF o programa</dt>
                        <dd>{submission.program}</dd>
                      </div>
                      <div>
                        <dt>Institucion de procedencia</dt>
                        <dd>{submission.school}</dd>
                      </div>
                      <div>
                        <dt>Fecha de validacion</dt>
                        <dd>{submission.createdAt}</dd>
                      </div>
                    </dl>
                    <div>
                      <strong>Documentos cargados</strong>
                      {submission.uploadedDocuments.length > 0 ? (
                        <ul>
                          {submission.uploadedDocuments.map((document) => (
                            <li key={document}>{document}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>No se detectaron documentos cargados.</p>
                      )}
                    </div>
                  </aside>
                ) : null}
              </form>
            ) : (
              <div id="preregistration-panel" className="card preregistration-closed">
                <p>
                  El preregistro se encuentra oculto. Presiona el boton para desplegar el
                  formulario completo con validaciones y carga de documentos.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </section>
  )
}
