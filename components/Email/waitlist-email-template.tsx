import { Html, Head, Preview, Body, Container, Section, Row, Column, Text, Hr, Link, Img } from "@react-email/components"

export function WaitlistEmail({ email }: { email: string }) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to WhyImBroke – You're on the list!</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header Section */}
          <Section>
            <Row>
              <Column>
                <Link href="https://whyimbroke.tech">
                <div style={headerLogo}>
                  <Text style={logoText}>WhyImBroke</Text>
                </div>
                </Link>
              </Column>
            </Row>
          </Section>

          {/* Main Content */}
          <Section style={paragraphContent}>
            <Hr style={hr} />
            <Text style={heading}>WELCOME TO THE WAITLIST</Text>
            <Text style={paragraph}>Hey there!</Text>
            <Text style={paragraph}>
              Thanks for signing up on our waitlist with <strong style={emailHighlight}>{email}</strong>. We're cooking
              something interesting—and we'll let you know the second it comes live.
            </Text>
            <Text style={paragraph}>
              You're now part of an exclusive group who will get first access to WhyImBroke when we launch. We're
              working hard to create something that will help you understand and manage your finances better.
            </Text>
          </Section>

          {/* What's Coming Section */}
          <Section style={paragraphContent}>
            <Text style={subHeading}>What to expect:</Text>
            <Text style={bulletPoint}>• Early access to WhyImBroke before public launch</Text>
            <Text style={bulletPoint}>• Exclusive updates on our development progress</Text>
            <Text style={bulletPoint}>• Special launch pricing for waitlist members</Text>
            <Hr style={hr} />
          </Section>

          {/* Closing */}
          <Section style={paragraphContent}>
            <Text style={paragraph}>
              We'll be in touch soon with updates. In the meantime, feel free to reach out if you have any questions or
              suggestions.
            </Text>
            <Text style={paragraph}>Talk soon,</Text>
            <Text style={signature}>Gurleen & The WhyImBroke Team</Text>
          </Section>

          {/* Footer */}
          <Section style={containerFooter}>
            <Text style={footerText}>Follow Gurleen for more updates</Text>

            <Row style={socialRow}>
              <Column style={socialColumn}>
                <Section style={socialLinks}>
                  <Link href="https://x.com/0xGurleen" style={iconLink}>
                    <Img
                      src="https://cdn-icons-png.flaticon.com/512/733/733579.png" // X / Twitter logo
                      width="30"
                      height="30"
                      alt="X"
                      style={icon}
                    />
                  </Link>
                  <Link href="https://www.linkedin.com/in/gurleen-wadhwa-56829a1a0/" style={iconLink}>
                    <Img
                      src="https://cdn-icons-png.flaticon.com/512/145/145807.png" // LinkedIn logo
                      width="30"
                      height="30"
                      alt="LinkedIn"
                      style={icon}
                    />
                  </Link>
                  <Link href="https://github.com/gurleenwadhwa-13" style={iconLink}>
                    <Img
                      src="https://cdn-icons-png.flaticon.com/512/733/733553.png" // GitHub logo
                      width="30"
                      height="30"
                      alt="GitHub"
                      style={icon}
                    />
                  </Link>
                  <Link href="https://gurleenwadhwa.dev" style={iconLink}>
                    <Img
                      src="https://cdn-icons-png.flaticon.com/512/25/25694.png" // Website globe icon
                      width="30"
                      height="30"
                      alt="Website"
                      style={icon}
                    />
                  </Link>
                </Section>
              </Column>
            </Row>

            <Text style={footerCopyright}>© 2025 WhyImBroke. All rights reserved.</Text>
            <Text style={footerCopyright}>You received this email because you signed up for our waitlist.</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  padding: "20px",
}

const container = {
  margin: "30px auto",
  backgroundColor: "#ffffff",
  borderRadius: 8,
  overflow: "hidden",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  maxWidth: "600px",
}

const headerLogo = {
  padding: "40px 40px 20px 40px",
  margin: 0,
  textAlign: "center" as const,
}

const logoText = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#2563eb",
  margin: 0,
}

const paragraphContent = {
  padding: "0 40px",
}

const heading = {
  fontSize: "14px",
  lineHeight: "26px",
  fontWeight: "700",
  color: "#2563eb",
  letterSpacing: "0.5px",
  textTransform: "uppercase" as const,
  margin: "0 0 20px 0",
}

const subHeading = {
  fontSize: "16px",
  lineHeight: "24px",
  fontWeight: "600",
  color: "#1f2937",
  margin: "20px 0 12px 0",
}

const paragraph = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#374151",
  margin: "0 0 16px 0",
}

const bulletPoint = {
  fontSize: "14px",
  lineHeight: "22px",
  color: "#6b7280",
  margin: "0 0 8px 0",
}

const emailHighlight = {
  color: "#2563eb",
  fontWeight: "600",
}

const signature = {
  fontSize: "16px",
  lineHeight: "24px",
  fontWeight: "600",
  color: "#1f2937",
  margin: "20px 0 0 0",
}

const hr = {
  borderColor: "#e5e7eb",
  margin: "24px 0",
  border: "none",
  borderTop: "1px solid #e5e7eb",
}

const containerFooter = {
  backgroundColor: "#f9fafb",
  padding: "20px 40px 30px 40px",
  borderTop: "1px solid #e5e7eb",
  textAlign: "center" as const,
}

const footerText = {
  fontSize: "14px",
  lineHeight: "22px",
  fontWeight: "600",
  color: "#6b7280",
  margin: "0 0 20px 0",
  textAlign: "center" as const,
}

const socialRow = {
  textAlign: "center" as const,
  margin: "0 0 24px 0",
}

const socialRowPreview = {
  display: "flex",
  justifyContent: "center",
  gap: "16px",
  margin: "0 0 24px 0",
}

const socialColumn = {
  display: "inline-block",
  width: "auto",
  paddingRight: "8px",
  paddingLeft: "8px",
}

const socialLink = {
  textDecoration: "none",
}

const socialIconBlack = {
  width: "40px",
  height: "40px",
  borderRadius: "20px",
  backgroundColor: "#000000",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  textDecoration: "none",
}

const socialIconBlue = {
  width: "40px",
  height: "40px",
  borderRadius: "20px",
  backgroundColor: "#0077b5",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  textDecoration: "none",
}

const socialIconGray = {
  width: "40px",
  height: "40px",
  borderRadius: "20px",
  backgroundColor: "#6b7280",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  textDecoration: "none",
}

const socialIconText = {
  color: "#ffffff",
  fontSize: "18px",
  fontWeight: "700",
  lineHeight: "18px",
  textDecoration: "none",
  margin: 0,
  display: "block",
}

const socialLinks = {
  display: "flex",
  gap: "30px",
  marginTop: "12px",
};

const iconLink = {
  display: "inline-block",
};

const icon = {
  borderRadius: "4px",
  padding: "10px",
};

const footerCopyright = {
  fontSize: "12px",
  lineHeight: "16px",
  color: "#9ca3af",
  margin: "0 0 4px 0",
  textAlign: "center" as const,
}