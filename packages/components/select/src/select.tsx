import {
  ComponentPropsWithoutRef,
  ElementRef,
  useState,
  forwardRef,
  useEffect,
} from 'react'
import { select } from '@mochi-ui/theme'
import * as SelectPrimitive from '@radix-ui/react-select'
import clsx from 'clsx'
import { CheckLine, ChevronDownLine, SpinnerLine } from '@mochi-ui/icons'
import {
  type SelectProps,
  type SelectItemProps,
  type SelectItemRef,
  type SelectTriggerRef,
  type SelectTriggerProps,
  type SelectGroupRef,
  SelectGroupProps,
} from './type'
import { SelectContextProvider, useSelectContext } from './context'

function Select(props: SelectProps) {
  const { onChange, defaultValue, value } = props
  const [isFilled, setIsFilled] = useState(false)

  useEffect(() => {
    if (!isFilled && (!!defaultValue || !!value)) {
      setIsFilled(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue, value])

  return (
    // Root has no ref
    <SelectContextProvider value={{ isFilled }}>
      <SelectPrimitive.Root
        onValueChange={(value) => {
          onChange?.(value)
          if (!isFilled) {
            setIsFilled(true)
          }
        }}
        defaultValue={defaultValue}
        value={value}
        {...props}
      />
    </SelectContextProvider>
  )
}
Select.displayName = SelectPrimitive.Root.displayName

const SelectGroup = forwardRef<SelectGroupRef, SelectGroupProps>(
  ({ className, ...props }, ref) => {
    return (
      <SelectPrimitive.Group
        className={clsx(select.group, className)}
        ref={ref}
        {...props}
      />
    )
  },
)
SelectGroup.displayName = SelectPrimitive.Group.displayName

const SelectValue = SelectPrimitive.Value

const SelectTrigger = forwardRef<SelectTriggerRef, SelectTriggerProps>(
  (props, ref) => {
    const {
      children,
      disabled,
      asChild,
      className,
      hideRightIcon,
      rightIcon,
      leftIcon,
      isError,
      color,
      appearance,
      variant,
      size,
      loading = false,
      ...restProps
    } = props
    const { isFilled } = useSelectContext()

    let rightIconRender = null
    if (loading) {
      rightIconRender = (
        <SpinnerLine
          className={select.iconChevron({
            appearance,
          })}
        />
      )
    } else if (rightIcon) {
      rightIconRender = rightIcon
    } else {
      rightIconRender = (
        <ChevronDownLine
          className={select.iconChevron({
            appearance,
          })}
        />
      )
    }

    return (
      <SelectPrimitive.Trigger
        asChild={asChild}
        className={select.triggerCva({
          className,
          color,
          variant,
          appearance,
          isFilled,
          size,
        })}
        disabled={disabled || loading}
        data-disable={disabled}
        data-error={isError}
        ref={ref}
        {...restProps}
      >
        {asChild ? (
          children
        ) : (
          <>
            {leftIcon ? (
              <SelectPrimitive.Icon asChild className={select.iconWrapperCva()}>
                {leftIcon}
              </SelectPrimitive.Icon>
            ) : null}
            <div className={select.value}>{children}</div>
            {hideRightIcon ? null : (
              <SelectPrimitive.Icon
                asChild
                className={select.iconWrapperCva({ isRightIcon: true })}
              >
                {rightIconRender}
              </SelectPrimitive.Icon>
            )}
          </>
        )}
      </SelectPrimitive.Trigger>
    )
  },
)
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectContent = forwardRef<
  ElementRef<typeof SelectPrimitive.Content>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      className={clsx(select.content, className)}
      position={position}
      ref={ref}
      sideOffset={8}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={clsx(
          position === 'popper' && select.viewportPoperMode,
          select.viewport,
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = forwardRef<
  ElementRef<typeof SelectPrimitive.Label>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    className={clsx(select.label, className)}
    ref={ref}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = forwardRef<SelectItemRef, SelectItemProps>((props, ref) => {
  const {
    children,
    className,
    disabled,
    leftIcon,
    rightIcon,
    extraRight,
    useIndicator,
    subTitle,
    ...restProps
  } = props

  const RightIconWrapper = useIndicator ? SelectPrimitive.ItemIndicator : 'span'

  return (
    <SelectPrimitive.Item
      className={select.itemCva({
        className,
        disabled,
      })}
      ref={ref}
      {...restProps}
      disabled={disabled}
    >
      {leftIcon ? (
        <span className={select.iconWrapperCva()}>{leftIcon}</span>
      ) : null}
      <div className={select.bodyWrapper}>
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        {subTitle ? (
          <span className={select.subTitleWrapper}>{subTitle}</span>
        ) : null}
      </div>
      {extraRight}
      {rightIcon ||
        (useIndicator && (
          <RightIconWrapper
            className={select.iconWrapperCva({ isRightIcon: true })}
          >
            {rightIcon || <CheckLine />}
          </RightIconWrapper>
        ))}
    </SelectPrimitive.Item>
  )
})
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = forwardRef<
  ElementRef<typeof SelectPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    className={clsx(select.separator, className)}
    ref={ref}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
}
