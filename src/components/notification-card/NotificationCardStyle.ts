import { styled } from '@mui/material/styles';
import { Paper, Box, Stack, Typography, Button } from '@mui/material';




export const StyledPaper = styled(Paper)({
  padding: '1.2em',
  marginBottom: '1.2em',
  backgroundColor: '#fefefe',
  borderRadius: 8,
  width: '100%',
});

export const SystemPaper = styled(Paper)({
  padding: '1.5em',
  marginBottom: '1.2em',
  backgroundColor: '#e8f5e9',
  borderLeft: '6px solid #4caf50',
  borderRadius: 8,
  width: '100%',
  textAlign: 'center',
});

export const RowBetween = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 16,
  flexWrap: 'nowrap',
  width: '100%',
});

export const FooterStack = styled(Stack)({
  marginTop: 24,
  justifyContent: 'center',
  alignItems: 'center',
});

export const ContactBox = styled(Box)({
  marginTop: '1.5em',
  backgroundColor: 'var(--secondary-color)',
  padding: '1.2em',
  borderRadius: 8,
  textAlign: 'center',
  color: '#000',
});

export const MessageTypography = styled(Typography)({
  wordBreak: 'break-word',
  overflowWrap: 'anywhere',
  flexGrow: 1,
});

export const IconBox = styled(Box)<{ color: string }>(({ color }) => ({
  color,
  flexShrink: 0,
}));

export const StackGrow = styled(Stack)({
  flexGrow: 1,
  minWidth: 0,
});

export const GreenTitle = styled(Typography)({
  color: '#2e7d32',
  fontWeight: 'bold',
});

export const TopSpacing = styled(Stack)({
  marginBottom: '1em',
});

export const DescriptionText = styled(Typography)({
  marginBottom: '1em',
});

export const GreenButton = styled(Button)({
  backgroundColor: '#4caf50',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#43a047',
  },
});

export const WhatsAppButton = styled(Button)({
  backgroundColor: '#25D366',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#1ebe5d',
  },
}) as typeof Button;

export const getIconAndColor = (message: string) => {
  const msg = message.toLowerCase();
  if (msg.includes('cancelado')) return { icon: 'cancel', color: '#ef5350' };
  if (msg.includes('nuevo turno')) return { icon: 'new', color: '#66bb6a' };
  if (msg.includes('editado') || msg.includes('modificado'))
    return { icon: 'edit', color: '#ffa726' };
  if (msg.includes('vacuna')) return { icon: 'vacuna', color: '#42a5f5' };
  return { icon: 'info', color: '#9e9e9e' };
};

